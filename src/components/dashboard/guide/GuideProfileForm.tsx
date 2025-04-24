import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { GuideProfile, GuideProfileFormData } from "@/types/guide";

interface GuideProfileFormProps {
  profileData: GuideProfile | null;
  userId: string;
  onProfileUpdate: (data: GuideProfile) => void;
}

export const GuideProfileForm = ({ profileData, userId, onProfileUpdate }: GuideProfileFormProps) => {
  const { toast } = useToast();

  const calculateProfileCompletion = () => {
    if (!profileData) return 25;
    const fields = ['full_name', 'location', 'bio', 'phone', 'specialization', 'languages', 'hourly_rate'];
    const filledFields = fields.filter(field => profileData[field as keyof GuideProfile]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!userId) return;
    
    const formData = new FormData(e.currentTarget);
    const formValues: GuideProfileFormData = {
      full_name: formData.get('full_name'),
      location: formData.get('location'),
      bio: formData.get('bio'),
      phone: formData.get('phone'),
      specialization: formData.get('specialization'),
      languages: formData.get('languages'),
      hourly_rate: formData.get('hourly_rate'),
    };
    
    const updatedProfile = {
      full_name: formValues.full_name as string,
      location: formValues.location as string,
      bio: formValues.bio as string,
      phone: formValues.phone as string,
      specialization: formValues.specialization as string,
      languages: formValues.languages as string,
      hourly_rate: formValues.hourly_rate ? Number(formValues.hourly_rate) : null,
    };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', userId) as any;
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onProfileUpdate({
        ...profileData as GuideProfile,
        ...updatedProfile,
        id: userId,
        user_type: profileData?.user_type || null
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleProfileUpdate} className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/3">
        <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
        <Button type="button" className="w-full bg-travel-blue hover:bg-travel-blue/90 mb-2">
          Update Photo
        </Button>
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
        <Button type="submit" className="bg-travel-green hover:bg-travel-green/90">Save Changes</Button>
      </div>
    </form>
  );
};
