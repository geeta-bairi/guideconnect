import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface Booking {
  id: string;
  status: string;
  created_at: string;
  guide: {
    full_name: string;
    location: string;
  };
}

export function BookingList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("id, status, created_at, guide:guide_id(full_name, location)")
      .eq("traveler_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="border rounded p-4 shadow">
          <h3 className="font-semibold text-lg">{booking.guide.full_name}</h3>
          <p className="text-sm text-gray-600">{booking.guide.location}</p>
          <p>Status: {booking.status}</p>
          <p className="text-xs text-gray-400">Booked on: {new Date(booking.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
