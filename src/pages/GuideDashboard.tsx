import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, DollarSign, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { GuideProfileForm } from "@/components/dashboard/guide/GuideProfileForm";
import { GuideMessages } from "@/components/dashboard/guide/GuideMessages";
import { GuideAvailability } from "@/components/dashboard/guide/GuideAvailability";
import { GuideBookings } from "@/components/dashboard/guide/GuideBookings";
import { GuideProfile } from "@/types/guide";
import { GuideStats } from "@/components/dashboard/guide/GuideStats";

const GuideDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<GuideProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-travel-blue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">GuideConnect</h1>
          <Button variant="ghost" className="text-white hover:bg-travel-blue/80" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-travel-blue">Guide Dashboard</h1>
        
        <GuideStats />
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="availability">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Availability</span>
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                {user && profileData && (
                  <GuideProfileForm 
                    profileData={profileData} 
                    userId={user.id} 
                    onProfileUpdate={setProfileData}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability">
            <GuideAvailability />
          </TabsContent>
          
          <TabsContent value="bookings">
            <GuideBookings />
          </TabsContent>
          
          <TabsContent value="messages">
            <GuideMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuideDashboard;
