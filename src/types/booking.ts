
export interface BookingDetails {
  id?: string;
  traveler_id: string;
  guide_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  description: string;
  location: string;
  created_at?: string;
  payment_id?: string;
  payment_status?: 'pending' | 'paid' | 'failed';
  guide?: {
    full_name: string;
    specialization?: string;
  };
}
