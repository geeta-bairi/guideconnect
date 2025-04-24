
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, MessageSquare, DollarSign, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const GuideDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-travel-blue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">GuideConnect</h1>
          <Button variant="ghost" className="text-white hover:bg-travel-blue/80">Logout</Button>
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
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                    <Button className="w-full bg-travel-blue hover:bg-travel-blue/90 mb-2">
                      Update Photo
                    </Button>
                    <p className="text-sm text-center text-gray-500 mb-4">Profile completion</p>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <input className="w-full p-2 border rounded" defaultValue="Maria Guide" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <input className="w-full p-2 border rounded" defaultValue="maria@example.com" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Location</label>
                        <input className="w-full p-2 border rounded" defaultValue="Paris, France" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <input className="w-full p-2 border rounded" defaultValue="+33 123 456 789" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-gray-500">Specialization</label>
                        <input className="w-full p-2 border rounded" defaultValue="Historical Walking Tours, Art Museums" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-gray-500">Bio</label>
                        <textarea
                          className="w-full p-2 border rounded h-24"
                          defaultValue="I'm a certified tour guide with 5 years of experience specializing in the artistic and historical heritage of Paris."
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Languages</label>
                        <input className="w-full p-2 border rounded" defaultValue="English, French, Spanish" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Hourly Rate ($)</label>
                        <input className="w-full p-2 border rounded" type="number" defaultValue="50" />
                      </div>
                    </div>
                    <Button className="bg-travel-green hover:bg-travel-green/90">Save Changes</Button>
                  </div>
                </div>
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
