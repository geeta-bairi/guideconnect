// src/components/BookGuideModal.tsx
import { toast } from "@/components/ui/use-toast";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth"; // make sure you have this or adjust according to your auth
import { supabase } from "@/lib/supabase";  // adjust import if needed

interface BookGuideModalProps {
  open: boolean;
  onClose: () => void;
  guide: any;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
}

export function BookGuideModal({ open, onClose, guide, selectedDate, selectedStartTime, selectedEndTime }: BookGuideModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings]= useState<any[]>([]);


  if (!guide) return null;
    // 🔥 Calculate Total Price
    const getDurationInHours = () => {
        const start = new Date(`1970-01-01T${selectedStartTime}:00`);
        const end = new Date(`1970-01-01T${selectedEndTime}:00`);
        const diffMs = end.getTime() - start.getTime();
        const hours = diffMs / (1000 * 60 * 60);
        return hours > 0 ? hours : 0;
      };
    
      const durationHours = getDurationInHours();
      const guideHourlyRate = guide.hourly_rate || 50; // Default to $50 if no hourly_rate
      const totalPrice = durationHours * guideHourlyRate;
    

  // ✅ Add handleConfirmBooking function here
  const handleConfirmBooking = async () => {
    if (!user) {
      toast({ title: "You must be logged in to book." });
      return;
    }


    console.log("Booking data to insert:", {
        traveler_id: user.id,
        guide_id: guide.id,
        booking_date: selectedDate,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        status: "pending",
        location: guide.location || "Unknown location",
      });
  
    // Insert booking
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
     
      .insert({
        traveler_id: user.id,
        guide_id: guide.id,
        booking_date: selectedDate,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        status: "pending",
        location: guide.location || "Unknown location",
        price: totalPrice

      })
      .select()
      .single();
  
    if (bookingError) {
      console.error("Booking error:", bookingError);
      toast({ title: "Booking failed." });
      return;
    }
  
    // Insert message
    const { error: messageError } = await supabase
      .from("messages")
      .insert({
        sender_id: user.id,
        receiver_id: guide.id,
        content: `Hello ${guide.full_name}, I have booked you for ${selectedDate} from ${selectedStartTime} to ${selectedEndTime}. The total price is $${totalPrice.toFixed(2)}. Looking forward to meeting you!`,
      });
  
    if (messageError) {
      console.error("Message insert error:", messageError);
      toast({ title: "Booking done, but failed to send message." });
    } else {
      toast({ title: "Booking confirmed and message sent!" });
    }
  
    onClose(); // close modal after booking
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book {guide.full_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p><strong>Location:</strong> {guide.location}</p>
          <p><strong>Specialization:</strong> {guide.specialization || "N/A"}</p>
          <p><strong>Languages:</strong> {guide.languages || "N/A"}</p>
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Start:</strong> {selectedStartTime}</p>
          <p><strong>End:</strong> {selectedEndTime}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleConfirmBooking} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
