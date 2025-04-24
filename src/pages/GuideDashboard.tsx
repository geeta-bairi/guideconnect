
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, MessageSquare, DollarSign, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const GuideDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
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

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) return;
    
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      full_name: formData.get('full_name'),
      location: formData.get('location'),
      bio: formData.get('bio'),
      phone: formData.get('phone'),
      specialization: formData.get('specialization'),
      languages: formData.get('languages'),
      hourly_rate: formData.get('hourly_rate'),
    };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      // Update local state
      setProfileData(prev => ({ ...prev, ...updatedProfile }));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
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

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!profileData) return 25;
    
    const fields = ['full_name', 'location', 'bio', 'phone', 'specialization', 'languages', 'hourly_rate'];
    const filledFields = fields.filter(field => profileData[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
                <Calendar className="text-travel-blue h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <h3 className="text-2xl font-bold">$0.00</h3>
                </div>
                <DollarSign className="text-travel-green h-8 w-8" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Messages</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
                <MessageSquare className="text-travel-coral h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>
        
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
              <CardHeader>
                <CardTitle>Guide Profile</CardTitle>
              </CardHeader>
              <CardContent>
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
                        <label className="text-sm text-gray-500">Email</label>
                        <input 
                          className="w-full p-2 border rounded bg-gray-100" 
                          readOnly
                          value={user?.email || ""} 
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Set Your Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="outline">Monday</Button>
                    <Button variant="outline">Tuesday</Button>
                    <Button variant="outline">Wednesday</Button>
                    <Button variant="outline">Thursday</Button>
                    <Button variant="outline">Friday</Button>
                    <Button variant="outline">Saturday</Button>
                    <Button variant="outline">Sunday</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-gray-500">Start Time</label>
                      <input className="w-full p-2 border rounded" type="time" defaultValue="09:00" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">End Time</label>
                      <input className="w-full p-2 border rounded" type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-2">Unavailable Dates</h3>
                  <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">From</label>
                        <input className="w-full p-2 border rounded" type="date" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">To</label>
                        <input className="w-full p-2 border rounded" type="date" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-travel-green hover:bg-travel-green/90">Save Availability</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-gray-500">No booking requests yet. Complete your profile to attract travelers!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-gray-500">No messages yet.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuideDashboard;
