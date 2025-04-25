import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, Search, Book, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { TravelerProfileForm } from "@/components/dashboard/traveler/TravelerProfileForm";

const TravelerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setProfileData(data);
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
                {user && (
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
