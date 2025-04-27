import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { GuideMessages } from "@/components/dashboard/guide/GuideMessages";
import { GuideAvailability } from "@/components/dashboard/guide/GuideAvailability";
import { GuideBookings } from "@/components/dashboard/guide/GuideBookings";
import { GuideStats } from "@/components/dashboard/guide/GuideStats";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { GuideProfile } from "@/types/guide";

const GuideDashboard = () => {
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<GuideProfile | null>(null);
  const [formData, setFormData] = useState<Partial<GuideProfile>>({});
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        toast({ title: "Error", description: "Failed to load profile", variant: "destructive" });
      } else {
        setProfileData(data);
        setFormData(data);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user, toast]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*, traveler:profiles!bookings_traveler_id_fkey(full_name)')
        .eq('guide_id', user.id)
        .order('created_at', { ascending: false });

      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*, sender:profiles!messages_sender_id_fkey(full_name)')
        .or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (bookingsError) console.error("Error fetching bookings:", bookingsError);
      else setBookings(bookingsData);

      if (messagesError) console.error("Error fetching messages:", messagesError);
      else setMessages(messagesData);
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ title: "Error", description: "Failed to sign out", variant: "destructive" });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", user.id);

      if (error) throw error;

      setProfileData({ ...profileData, ...formData } as GuideProfile);
      setEditMode(false);
      toast({ title: "Success", description: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>{t('loading')}</div>
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

        <GuideStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />{t('profile')}</TabsTrigger>
            <TabsTrigger value="availability"><Calendar className="h-4 w-4 mr-2" />{t('availability')}</TabsTrigger>
            <TabsTrigger value="bookings"><Calendar className="h-4 w-4 mr-2" />{t('bookings')}</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="h-4 w-4 mr-2" />{t('messages')}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-4 text-gray-700">
                {profileData ? (
                  <>
                    {editMode ? (
                      <>
                        {["full_name", "location", "bio", "phone", "specialization", "languages", "hourly_rate"].map((field) => (
                          <div key={field}>
                            <strong>{field.replace("_", " ").toUpperCase()}:</strong>
                            <input
                              type={field === "bio" ? "textarea" : (field === "hourly_rate" ? "number" : "text")}
                              value={formData[field] ?? ''}
                              onChange={(e) => setFormData({ ...formData, [field]: field === "hourly_rate" ? parseFloat(e.target.value) : e.target.value })}
                              className="border p-2 rounded w-full"
                            />
                          </div>
                        ))}
                        <div className="flex space-x-2 pt-4">
                          <Button onClick={handleSaveProfile}>{t('save')}</Button>
                          <Button variant="outline" onClick={() => { setEditMode(false); setFormData(profileData); }}>{t('cancel')}</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div><strong>Full Name:</strong> {profileData.full_name}</div>
                        <div><strong>Location:</strong> {profileData.location}</div>
                        <div><strong>Bio:</strong> {profileData.bio}</div>
                        <div><strong>Phone:</strong> {profileData.phone}</div>
                        <div><strong>Specialization:</strong> {profileData.specialization}</div>
                        <div><strong>Languages:</strong> {profileData.languages}</div>
                        <div><strong>Hourly Rate:</strong> ${profileData.hourly_rate}</div>
                        <Button className="mt-4" onClick={() => setEditMode(true)}>
                          {t('edit')}
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <div>{t('noProfileData')}</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <GuideAvailability />
          </TabsContent>

          <TabsContent value="bookings">
            <GuideBookings bookings={bookings} />
          </TabsContent>

          <TabsContent value="messages">
            <GuideMessages messages={messages} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuideDashboard;
