
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, Search, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { TravelerProfileForm } from "@/components/dashboard/traveler/TravelerProfileForm";
import { BookingsList } from "@/components/dashboard/traveler/BookingsList";
import { MessagesList } from "@/components/dashboard/traveler/MessagesList";
import type { TravelerProfile } from "@/types/profile";

const TravelerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<TravelerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;

        const { data: travelerData, error: travelerError } = await supabase
          .from('travelers')
          .select('*')
          .eq('id', user.id)
          .single();

        if (travelerError && travelerError.code !== 'PGRST116') {
          throw travelerError;
        }

        setProfileData({
          ...profileData,
          ...travelerData,
          email: user.email
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
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
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
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
            <Button variant="ghost" className="text-white hover:bg-travel-blue/80" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-travel-blue">{t('dashboard')}</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[400px]">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t('profile')}</span>
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
              <CardContent className="pt-6">
                {user && profileData && (
                  <TravelerProfileForm 
                    profileData={profileData}
                    userId={user.id}
                    onProfileUpdate={setProfileData}
                    userEmail={user.email}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card>
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
            <BookingsList />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelerDashboard;
