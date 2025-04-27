import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function GuideBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const fetchBookings = async () => {
    if (!user) return;
  
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        status,
        traveler_id,
        guide_id,
        booking_date,
        start_time,
        end_time,
        price,
        traveler:traveler_id(full_name)
      `)
      
      .eq('guide_id', user.id);
  
    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data || []);
    }
  };
  
  // useEffect
  useEffect(() => {
    fetchBookings();
  }, [user]);
  

  // Fetch bookings for the guide
 

  // Accept booking and send message
  const acceptBooking = async (bookingId: string, travelerId: string) => {
    if (!user) return;
  
    console.log('Accepting booking with ID:', bookingId);
  
    const { data: updatedData, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', bookingId)
      .select(); // make it return the updated row
  
    if (updateError) {
      console.error('Error updating booking:', updateError);
      return;
    }
  
    console.log('✅ Booking updated:', updatedData);
  
    // Insert message
    const { error: messageError } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: user.id,
          receiver_id: travelerId,
          content: "Booking confirmed! 🎉 Looking forward to our trip!",
          read: false,
          booking_id: bookingId,
        }
      ]);
  
    if (messageError) {
      console.error('Error sending message:', messageError);
    }
  
    // Re-fetch all bookings from Supabase
    fetchBookings(); // <-- call fetch again!
  };
  

  if (!bookings.length) {
    return <div>No bookings yet!</div>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 border rounded-lg bg-white shadow">
        <p><strong>Traveler:</strong> {booking.traveler?.full_name || "Unknown Traveler"}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Booking Date:</strong> {booking.booking_date || "Not set"}</p>
        <p><strong>Start Time:</strong> {booking.start_time || "Not set"}</p>
        <p><strong>End Time:</strong> {booking.end_time || "Not set"}</p>
        <p><strong>Price:</strong> ${booking.price || "N/A"}</p>
      
        {booking.status === "pending" && (
          <button
            onClick={() => acceptBooking(booking.id, booking.traveler_id)}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Accept Booking
          </button>
        )}
      </div>
      ))}
    </div>
  );
}
