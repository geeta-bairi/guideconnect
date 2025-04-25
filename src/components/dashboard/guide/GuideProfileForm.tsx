import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GuideProfile } from "@/types/guide"; 

export interface GuideProfileProps {
  profileData: GuideProfile | null;
  userId: string;
  userEmail?: string | null;
  onProfileUpdate: (data: GuideProfile) => void;
}

export const GuideProfileForm = ({ 
  profileData, 
  userId, 
  userEmail,
  onProfileUpdate 
}: GuideProfileProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const calculateProfileCompletion = () => {
    if (!profileData) return 25;
    const fields = ['full_name', 'location', 'bio', 'phone', 'specialization', 'languages', 'hourly_rate', 'years_experience'];
    const filledFields = fields.filter(field => profileData[field as keyof GuideProfile]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const formData = new FormData(e.currentTarget);
      const hourlyRateValue = formData.get('hourly_rate');
      const yearsExperienceValue = formData.get('years_experience');
      const certificationsValue = formData.get('certifications');
      const availabilityValue = formData.get('availability');
      
      let certifications = null;
      if (certificationsValue) {
        try {
          certifications = JSON.parse(certificationsValue as string);
        } catch (e) {
          console.warn('Failed to parse certifications JSON, storing as string');
          certifications = certificationsValue;
        }
      }
      
      let availability = null;
      if (availabilityValue) {
        try {
          availability = JSON.parse(availabilityValue as string);
        } catch (e) {
          console.warn('Failed to parse availability JSON, storing as string');
          availability = availabilityValue;
        }
      }
      
      const updatedProfile = {
        full_name: formData.get('full_name') as string,
        location: formData.get('location') as string,
        bio: formData.get('bio') as string,
        phone: formData.get('phone') as string,
        specialization: formData.get('specialization') as string,
        languages: formData.get('languages') as string,
        hourly_rate: hourlyRateValue ? parseFloat(hourlyRateValue as string) : null,
        years_experience: yearsExperienceValue ? parseInt(yearsExperienceValue as string) : null,
        certifications,
        availability,
        email: userEmail || null,
        user_type: 'guide'
      };
      
      // Update the profile
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      
      // Handle file upload if there is a selected file
      if (selectedFile) {
        const filePath = `${userId}/profile`;
        const { error: uploadError } = await supabase.storage
          .from('profile_images')
          .upload(filePath, selectedFile, { upsert: true });
        
        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('profile_images')
          .getPublicUrl(filePath);
        
        // Update profile with avatar URL
        await supabase
          .from('profiles')
          .update({ avatar_url: urlData.publicUrl })
          .eq('id', userId);
        
        // Update local state with new avatar URL
        if (data && data.length > 0) {
          data[0].avatar_url = urlData.publicUrl;
        }
      }
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      if (data && data.length > 0) {
        onProfileUpdate({
          ...data[0] as GuideProfile,
          avatar_url: data[0]?.avatar_url || profileData?.avatar_url,
          years_experience: data[0]?.years_experience || profileData?.years_experience,
          certifications: data[0]?.certifications || profileData?.certifications,
          availability: data[0]?.availability || profileData?.availability,
          email: userEmail || profileData?.email
        });
      } else {
        // Make sure we update the local state even if no data is returned
        onProfileUpdate({
          ...profileData as GuideProfile,
          ...updatedProfile,
          id: userId,
          avatar_url: profileData?.avatar_url
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleProfileUpdate} className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/3">
        <div className="relative w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden">
          <Avatar className="w-32 h-32">
            {profileData?.avatar_url ? (
              <AvatarImage src={profileData.avatar_url} alt="Profile picture" />
            ) : (
              <AvatarFallback>{profileData?.full_name?.charAt(0) || profileData?.email?.charAt(0) || 'G'}</AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="mb-4">
          <input 
            type="file" 
            id="profilePhoto" 
            name="profilePhoto" 
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="profilePhoto" className="w-full flex justify-center mb-2">
            <Button type="button" className="w-full bg-travel-blue hover:bg-travel-blue/90">
              {selectedFile ? t('updatePhoto') : t('updatePhoto')}
            </Button>
          </label>
          {selectedFile && (
            <p className="text-xs text-center text-gray-500">Selected: {selectedFile.name}</p>
          )}
        </div>
        <p className="text-sm text-center text-gray-500 mb-4">{t('profile')}</p>
        <Progress value={calculateProfileCompletion()} className="h-2" />
      </div>
      <div className="md:w-2/3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">{t('fullName')}</label>
            <input 
              name="full_name" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.full_name || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('location')}</label>
            <input 
              name="location" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.location || ""} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('phone')}</label>
            <input 
              name="phone" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.phone || ""} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('specialization')}</label>
            <input 
              name="specialization" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.specialization || ""} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">{t('bio')}</label>
            <textarea
              name="bio"
              className="w-full p-2 border rounded h-24"
              defaultValue={profileData?.bio || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('languages')}</label>
            <input 
              name="languages" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.languages || ""} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('hourlyRate')}</label>
            <input 
              name="hourly_rate" 
              className="w-full p-2 border rounded" 
              type="number" 
              defaultValue={profileData?.hourly_rate || "50"} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('yearsExperience')}</label>
            <input 
              name="years_experience" 
              className="w-full p-2 border rounded" 
              type="number" 
              defaultValue={profileData?.years_experience || "1"} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">{t('certifications')}</label>
            <input 
              name="certifications" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.certifications ? JSON.stringify(profileData.certifications) : ""} 
              placeholder='[{"name": "Tour Guide License", "year": 2020}]'
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">{t('availability')}</label>
            <input 
              name="availability" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.availability ? JSON.stringify(profileData.availability) : ""} 
              placeholder='{"monday": ["9:00-17:00"], "tuesday": ["10:00-18:00"]}'
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-travel-green hover:bg-travel-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('loading') : t('save')}
        </Button>
      </div>
    </form>
  );
};
