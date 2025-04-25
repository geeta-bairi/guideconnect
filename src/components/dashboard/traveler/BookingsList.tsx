
import { BookingDetails } from "@/types/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export const BookingsList = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Get bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .order('booking_date', { ascending: true });

        if (bookingsError) throw bookingsError;

        // Get guide profiles
        const guideIds = bookingsData?.map(booking => booking.guide_id) || [];
        const { data: guidesData, error: guidesError } = await supabase
          .from('profiles')
          .select('id, full_name, specialization')
          .in('id', guideIds);
          
        if (guidesError) throw guidesError;
        
        // Create a map of guide IDs to guide info
        const guideMap = new Map();
        guidesData?.forEach(guide => {
          guideMap.set(guide.id, { 
            full_name: guide.full_name,
            specialization: guide.specialization
          });
        });
        
        // Combine bookings with guide info
        const typedBookings: BookingDetails[] = (bookingsData || []).map(booking => ({
          id: booking.id,
          traveler_id: booking.traveler_id,
          guide_id: booking.guide_id,
          booking_date: booking.booking_date,
          start_time: booking.start_time,
          end_time: booking.end_time,
          status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled',
          price: booking.price,
          description: booking.description || '',
          location: booking.location,
          created_at: booking.created_at || '',
          guide: guideMap.get(booking.guide_id) || { full_name: 'Unknown' }
        }));
        
        setBookings(typedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('yourBookings')}</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">{t('noBookingsYet')}</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded-lg">
                <h3 className="font-medium">{booking.guide?.full_name}</h3>
                <p className="text-sm text-gray-500">{booking.booking_date}</p>
                <p>{booking.location}</p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-sm rounded ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
