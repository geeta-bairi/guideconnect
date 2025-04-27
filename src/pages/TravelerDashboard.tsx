import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { BookingList } from "@/components/dashboard/traveler/BookingList";
import { MessageList } from "@/components/dashboard/traveler/MessageList";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BookGuideModal } from "@/components/BookGuideModal";
import type { TravelerProfile } from "@/types/profile";
import type { Message } from "@/types/message"; // 👈 Make sure you have this type!

const TravelerDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState<TravelerProfile | null>(null);
  const [guides, setGuides] = useState<any[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [searchLocation, setSearchLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<any>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fetchProfile = async () => {
    if (!user) return;
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      setProfile({ ...data, email: user.email });
    } catch (err) {
      toast({ title: "Error", description: "Failed to load profile", variant: "destructive" });
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchGuides = async () => {
    setLoadingGuides(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "guide");
      if (error) throw error;
      setGuides(data || []);
      setFilteredGuides(data || []);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load guides", variant: "destructive" });
    } finally {
      setLoadingGuides(false);
    }
  };

  const fetchMessages = async () => {
    if (!user) return;
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("id, content, created_at, booking_id, sender_id, receiver_id")
        .eq("receiver_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };
  const fetchBookings = async () => {
    if (!user) return;
  
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          guide:guide_id (full_name, phone)
        `)
        .eq("traveler_id", user.id)
        .order("created_at", { ascending: false });
  
      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast({ title: "Error", description: "Failed to load bookings", variant: "destructive" });
    }
  };
  

  const handleSearchGuides = () => {
    const search = searchLocation.trim().toLowerCase();
    if (!search) {
      setFilteredGuides(guides);
      return;
    }
    const results = guides.filter((g) => g.location?.toLowerCase().includes(search));
    setFilteredGuides(results);
    if (results.length === 0) {
      toast({ title: "No results found", description: "Try a different location.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchGuides();
    fetchMessages();
    fetchBookings();
  }, [user]);
  useEffect(() => {
    if (bookings.length > 0) {
      const confirmedBooking = bookings.find(b => b.status === "confirmed");
  
      if (confirmedBooking && confirmedBooking.guide) {
        toast({
          title: "✅ Booking Confirmed!",
          description: (
            <div>
              <p>Please contact <strong>{confirmedBooking.guide.full_name}</strong> at 📞 <strong>{confirmedBooking.guide.phone}</strong> for further communication.</p>
            </div>
          ),
        });
      }
    }
  }, [bookings]);
  

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-travel-blue text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{t("appName")}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-white" onClick={handleLogout}>
              {t("logout")}
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-travel-blue">{t("dashboard")}</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[400px]">
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-2" />{t("profile")}</TabsTrigger>
            <TabsTrigger value="search"><Search className="w-4 h-4 mr-2" />{t("findGuides")}</TabsTrigger>
            <TabsTrigger value="bookings"><Calendar className="w-4 h-4 mr-2" />{t("bookings")}</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="w-4 h-4 mr-2" />{t("messages")}</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {profile ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const { error } = await supabase
                        .from("profiles")
                        .update({
                          full_name: profile.full_name,
                          bio: profile.bio,
                          location: profile.location,
                        })
                        .eq("id", user?.id);
                      if (error) {
                        toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
                      } else {
                        toast({ title: "Success", description: "Profile updated!" });
                      }
                    }}
                    className="space-y-4"
                  >
                    {/* Profile Inputs */}
                    <div>
                      <label className="font-semibold">{t("name")}</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-semibold">{t("email")}</label>
                      <input
                        type="email"
                        className="w-full bg-gray-100 border rounded px-3 py-2"
                        value={profile.email}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="font-semibold">{t("bio")}</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        value={profile.bio || ""}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-semibold">{t("location")}</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={profile.location || ""}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full">{t("saveChanges")}</Button>
                  </form>
                ) : (
                  <p>{t("noProfileData")}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search Guides Tab */}
          <TabsContent value="search">
            <Card>
              <CardContent className="space-y-4 pt-6">
                {/* Search Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder={t("enterLocation")}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Button onClick={handleSearchGuides}>
                    <Search className="w-4 h-4 mr-2" />
                    {t("find")}
                  </Button>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="date" className="border rounded px-3 py-2" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  <input type="time" className="border rounded px-3 py-2" value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)} />
                  <input type="time" className="border rounded px-3 py-2" value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)} />
                </div>

                {/* Guide Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {loadingGuides ? (
                    <p>{t("loading")}</p>
                  ) : filteredGuides.length > 0 ? (
                    filteredGuides.map((guide) => (
                      <Card key={guide.id} className="shadow-md hover:shadow-lg transition">
                        <CardContent className="space-y-2 pt-4">
                          <h3 className="text-xl font-semibold">{guide.full_name}</h3>
                          <p className="text-sm text-gray-600">{guide.location}</p>
                          <p className="text-sm">{guide.bio}</p>
                          <p className="text-sm">Specialization: {guide.specialization || "N/A"}</p>
                          <p className="text-sm">Languages: {guide.languages || "N/A"}</p>
                          <p className="text-sm font-semibold">Cost: ${guide.hourly_rate || "N/A"}/hr</p>
                          <Button
                            className="w-full mt-2"
                            onClick={() => {
                              setSelectedGuide(guide);
                              setModalOpen(true);
                            }}
                          >
                            {t("book")}
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-gray-500">{t("noGuidesFound")}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardContent className="p-4">
                <BookingList />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-4">
                <MessageList messages={messages} loading={loadingMessages} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Book Guide Modal */}
      <BookGuideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        guide={selectedGuide}
        selectedDate={selectedDate}
        selectedStartTime={selectedStartTime}
        selectedEndTime={selectedEndTime}
      />
    </div>
  );
};

export default TravelerDashboard;
