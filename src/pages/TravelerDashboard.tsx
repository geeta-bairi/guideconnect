
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, MessageSquare, Search, Book, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const TravelerDashboard = () => {
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
      phone: formData.get('phone'),
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-travel-blue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">GuideConnect</h1>
          <Button variant="ghost" className="text-white hover:bg-travel-blue/80" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-travel-blue">Traveler Dashboard</h1>
        
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="itinerary">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Itinerary</span>
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Find Guides</span>
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
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                    <Button className="w-full bg-travel-blue hover:bg-travel-blue/90">
                      Update Photo
                    </Button>
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
                    </div>
                    <Button type="submit" className="bg-travel-green hover:bg-travel-green/90">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="itinerary">
            <Card>
              <CardHeader>
                <CardTitle>AI Itinerary Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Plan Your Perfect Trip</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input className="p-2 border rounded" placeholder="Destination" />
                    <input className="p-2 border rounded" placeholder="Start Date" type="date" />
                    <input className="p-2 border rounded" placeholder="End Date" type="date" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">History</Button>
                      <Button variant="outline" size="sm">Food</Button>
                      <Button variant="outline" size="sm">Adventure</Button>
                      <Button variant="outline" size="sm">Nature</Button>
                      <Button variant="outline" size="sm">Culture</Button>
                    </div>
                  </div>
                  <Button className="bg-travel-green hover:bg-travel-green/90">Generate Itinerary</Button>
                </div>
                <div className="text-center p-8">
                  <p className="text-gray-500">No itineraries yet. Use the form above to create one!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Find Local Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input className="p-2 border rounded" placeholder="City or Country" />
                    <input className="p-2 border rounded" placeholder="Date" type="date" />
                    <select className="p-2 border rounded">
                      <option value="">Specialization</option>
                      <option value="history">History</option>
                      <option value="food">Food & Cuisine</option>
                      <option value="adventure">Adventure</option>
                      <option value="nature">Nature</option>
                    </select>
                    <Button className="bg-travel-blue hover:bg-travel-blue/90">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
                <div className="text-center p-8">
                  <p className="text-gray-500">Search for guides to see results here!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-gray-500">No bookings yet. Find guides and book experiences!</p>
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
                  <p className="text-gray-500">No messages yet. Start chatting with your guides!</p>
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
