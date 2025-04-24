
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GuideProfile, GuideProfileFormData } from "@/types/guide";
import { useState } from "react";

interface GuideProfileFormProps {
  profileData: GuideProfile | null;
  userId: string;
  onProfileUpdate: (data: GuideProfile) => void;
}

export const GuideProfileForm = ({ profileData, userId, onProfileUpdate }: GuideProfileFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const calculateProfileCompletion = () => {
    if (!profileData) return 25;
    const fields = ['full_name', 'location', 'bio', 'phone', 'specialization', 'languages', 'hourly_rate'];
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
      
      const updatedProfile = {
        full_name: formData.get('full_name') as string,
        location: formData.get('location') as string,
        bio: formData.get('bio') as string,
        phone: formData.get('phone') as string,
        specialization: formData.get('specialization') as string,
        languages: formData.get('languages') as string,
        hourly_rate: hourlyRateValue ? parseFloat(hourlyRateValue as string) : null,
      };
      
      console.log("Updating profile with data:", updatedProfile);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', userId)
        .select();
      
      if (error) throw error;
      
      // Handle file upload if there is a selected file
      if (selectedFile) {
        // Upload logic would go here once we create a storage bucket
        console.log("Would upload file:", selectedFile.name);
      }
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      if (data && data.length > 0) {
        onProfileUpdate(data[0] as GuideProfile);
      } else {
        // Make sure we update the local state even if no data is returned
        onProfileUpdate({
          ...profileData as GuideProfile,
          ...updatedProfile,
          id: userId,
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
        <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4">
          {/* Profile image preview would go here */}
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
              {selectedFile ? "Change Photo" : "Update Photo"}
            </Button>
          </label>
          {selectedFile && (
            <p className="text-xs text-center text-gray-500">Selected: {selectedFile.name}</p>
          )}
        </div>
        <p className="text-sm text-center text-gray-500 mb-4">Profile completion</p>
        <Progress value={calculateProfileCompletion()} className="h-2" />
      </div>
      <div className="md:w-2/3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input 
              name="full_name" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.full_name || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Location</label>
            <input 
              name="location" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.location || ""} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input 
              name="phone" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.phone || ""} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Specialization</label>
            <input 
              name="specialization" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.specialization || ""} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Bio</label>
            <textarea
              name="bio"
              className="w-full p-2 border rounded h-24"
              defaultValue={profileData?.bio || ""}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Languages</label>
            <input 
              name="languages" 
              className="w-full p-2 border rounded" 
              defaultValue={profileData?.languages || ""} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Hourly Rate ($)</label>
            <input 
              name="hourly_rate" 
              className="w-full p-2 border rounded" 
              type="number" 
              defaultValue={profileData?.hourly_rate || "50"} 
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-travel-green hover:bg-travel-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};
