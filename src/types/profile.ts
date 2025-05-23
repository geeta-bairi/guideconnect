
export interface Profile {
  id: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  phone: string | null;
  languages: string | null;
  hourly_rate: number | null;
  specialization: string | null;
  user_type: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TravelerProfile extends Profile {
  favorite_destinations?: string[] | null;
  travel_history?: any | null;
  preferences?: any | null;
}

export interface GuideProfile extends Profile {
  hourly_rate: number | null;
  specialization: string | null;
  years_experience?: number | null;
  certifications?: any | null;
  availability?: any | null;
}
