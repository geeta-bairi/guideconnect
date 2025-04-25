
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TravelerProfile } from "@/types/profile";

interface TravelerProfileFormProps {
  profileData: TravelerProfile;
  userId: string;
  userEmail?: string | null;
  onProfileUpdate: (data: TravelerProfile) => void;
}

export const TravelerProfileForm = ({
  profileData,
  userId,
  userEmail,
  onProfileUpdate
}: TravelerProfileFormProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const updatedProfile = {
        full_name: formData.get('full_name') as string,
        location: formData.get('location') as string,
        bio: formData.get('bio') as string,
        phone: formData.get('phone') as string,
        languages: formData.get('languages') as string,
        email: userEmail || null,
        user_type: 'traveler'
      };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', userId)
        .select();
      
      if (error) throw error;

      if (selectedFile) {
        const filePath = `${userId}/profile`;
        const { error: uploadError } = await supabase.storage
          .from('profile_images')
          .upload(filePath, selectedFile, { upsert: true });
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('profile_images')
          .getPublicUrl(filePath);
        
        await supabase
          .from('profiles')
          .update({ avatar_url: urlData.publicUrl })
          .eq('id', userId);
        
        if (data && data.length > 0) {
          data[0].avatar_url = urlData.publicUrl;
        }
      }
      
      toast({
        title: t('saveSuccess'),
        description: "Profile updated successfully",
      });
      
      if (data && data.length > 0) {
        onProfileUpdate({
          ...data[0],
          avatar_url: data[0]?.avatar_url || profileData?.avatar_url,
          email: userEmail || profileData?.email
        } as TravelerProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('saveError'),
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
              <AvatarFallback>{profileData?.full_name?.charAt(0) || profileData?.email?.charAt(0) || 'T'}</AvatarFallback>
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
            <label className="text-sm text-gray-500">{t('languages')}</label>
            <input 
              name="languages" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.languages || ""} 
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
