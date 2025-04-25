import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, Search, Book, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

interface TravelerProfile {
  id: string;
  full_name: string | null;
  location: string | null;
  phone: string | null;
  preferences: any | null;
  languages: string | null;
  avatar_url: string | null;
  email: string | null;
  user_type: string | null;
}

const TravelerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<TravelerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) throw error;
        setProfileData(data as TravelerProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: t('saveError'),
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: t('saveError'),
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) return;
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    
    let preferences = null;
    const preferencesValue = formData.get('preferences') as string;
    if (preferencesValue && preferencesValue.trim() !== '') {
      try {
        preferences = JSON.parse(preferencesValue);
      } catch (error) {
        console.error('Failed to parse preferences JSON:', error);
        toast({
          title: "Error",
          description: "Failed to parse preferences. Please use valid JSON format.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
    }
    
    const updatedProfile = {
      full_name: formData.get('full_name') as string,
      location: formData.get('location') as string,
      phone: formData.get('phone') as string,
      languages: formData.get('languages') as string,
      preferences: preferences,
      email: user.email,
      user_type: 'traveler'
    };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id);
      
      if (error) throw error;
      
      if (selectedFile) {
        const filePath = `${user.id}/profile`;
        const { error: uploadError } = await supabase.storage
          .from('profile_images')
          .upload(filePath, selectedFile, {
            upsert: true,
          });
        
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('profile_images')
          .getPublicUrl(filePath);
        
        await supabase
          .from('profiles')
          .update({ avatar_url: data.publicUrl })
          .eq('id', user.id);
        
        setProfileData(prev => prev ? { ...prev, avatar_url: data.publicUrl } : null);
      }
      
      toast({
        title: t('saveSuccess'),
        description: "Profile updated successfully",
      });
      
      setProfileData(prev => prev ? { ...prev, ...updatedProfile } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('saveError'),
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-travel-blue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{t('appName')}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-white hover:bg-travel-blue/80" onClick={handleLogout}>{t('logout')}</Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-travel-blue">{t('dashboard')}</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('profile')}</span>
            </TabsTrigger>
            <TabsTrigger value="itinerary">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('itinerary')}</span>
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('findGuides')}</span>
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('bookings')}</span>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('messages')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('myProfile')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="relative w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden">
                      <Avatar className="w-32 h-32">
                        {profileData?.avatar_url ? (
                          <AvatarImage src={profileData.avatar_url} alt="Profile picture" />
                        ) : (
                          <AvatarFallback>{profileData?.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="avatar" className="w-full block">
                      <Button type="button" className="w-full bg-travel-blue hover:bg-travel-blue/90">
                        {t('updatePhoto')}
                      </Button>
                    </label>
                    {selectedFile && (
                      <p className="text-xs text-center mt-2">{selectedFile.name}</p>
                    )}
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
                        <label className="text-sm text-gray-500">{t('email')}</label>
                        <input 
                          className="w-full p-2 border rounded bg-gray-100" 
                          readOnly 
                          value={user?.email || ""} 
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
                          placeholder="English, Spanish, ..."
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">{t('preferences')}</label>
                        <input 
                          name="preferences" 
                          className="w-full p-2 border rounded" 
                          defaultValue={profileData?.preferences ? JSON.stringify(profileData.preferences) : ""}
                          placeholder='{"food": "vegetarian", "accommodation": "hotel"}'
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-travel-green hover:bg-travel-green/90"
                      disabled={isSaving}
                    >
                      {isSaving ? t('loading') : t('save')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="itinerary">
            <Card>
              <CardHeader>
                <CardTitle>{t('aiItineraryPlanner')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">{t('planYourTrip')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input className="p-2 border rounded" placeholder={t('destination')} />
                    <input className="p-2 border rounded" placeholder={t('startDate')} type="date" />
                    <input className="p-2 border rounded" placeholder={t('endDate')} type="date" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">{t('interests')}</label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">History</Button>
                      <Button variant="outline" size="sm">Food</Button>
                      <Button variant="outline" size="sm">Adventure</Button>
                      <Button variant="outline" size="sm">Nature</Button>
                      <Button variant="outline" size="sm">Culture</Button>
                    </div>
                  </div>
                  <Button className="bg-travel-green hover:bg-travel-green/90">{t('generateItinerary')}</Button>
                </div>
                <div className="text-center p-8">
                  <p className="text-gray-500">{t('noItinerariesYet')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>{t('findLocalGuides')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input className="p-2 border rounded" placeholder={t('cityOrCountry')} />
                    <input className="p-2 border rounded" placeholder={t('date')} type="date" />
                    <select className="p-2 border rounded">
                      <option value="">{t('specialization')}</option>
                      <option value="history">History</option>
                      <option value="food">Food & Cuisine</option>
                      <option value="adventure">Adventure</option>
                      <option value="nature">Nature</option>
                    </select>
                    <Button className="bg-travel-blue hover:bg-travel-blue/90">
                      <Search className="h-4 w-4 mr-2" />
                      {t('search')}
                    </Button>
                  </div>
                </div>
                <div className="text-center p-8">
                  <p className="text-gray-500">{t('searchForGuides')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>{t('yourBookings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-gray-500">{t('noBookingsYet')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>{t('messages')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-gray-500">{t('noMessagesYet')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelerDashboard;
