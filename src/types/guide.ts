
export interface GuideProfile {
  id: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  phone: string | null;
  specialization: string | null;
  languages: string | null;
  hourly_rate: number | null;
  user_type: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface GuideProfileFormData {
  full_name: string | null;
  location: string | null;
  bio: string | null;
  phone: string | null;
  specialization: string | null;
  languages: string | null;
  hourly_rate: string | null;
}
