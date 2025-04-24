
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ProtectedRoute({ 
  children,
  userType
}: { 
  children: React.ReactNode;
  userType?: "guide" | "traveler";
}) {
  const { user, loading } = useAuth();
  const [profileType, setProfileType] = useState<string | null>(null);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkUserType = async () => {
      if (user && userType) {
        setIsCheckingProfile(true);
        try {
          // Cast the response type to handle the TypeScript error
          const { data, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.id)
            .single() as any;
          
          if (error) throw error;
          setProfileType(data?.user_type || null);
        } catch (error) {
          console.error('Error fetching user type:', error);
        } finally {
          setIsCheckingProfile(false);
        }
      }
    };

    checkUserType();
  }, [user, userType]);

  if (loading || (userType && isCheckingProfile)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If userType is specified and doesn't match the profile type, redirect to appropriate dashboard
  if (userType && profileType && userType !== profileType) {
    const redirectPath = profileType === 'guide' ? '/guide-dashboard' : '/traveler-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
