
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
}

// Type for use with form submissions
export interface GuideProfileFormData {
  full_name: FormDataEntryValue | null;
  location: FormDataEntryValue | null;
  bio: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  specialization: FormDataEntryValue | null;
  languages: FormDataEntryValue | null;
  hourly_rate: FormDataEntryValue | null;
}
