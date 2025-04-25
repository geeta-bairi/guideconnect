
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserInfoSection } from "./UserInfoSection";
import { PasswordSection } from "./PasswordSection";
import { UserTypeSection } from "./UserTypeSection";
import { AgreementSection } from "./AgreementSection";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      userType: "traveler",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <UserInfoSection control={form.control} />
        <PasswordSection control={form.control} />
        <UserTypeSection control={form.control} />
        <AgreementSection control={form.control} />
        
        <Button 
          className="w-full bg-travel-green hover:bg-travel-green/90 text-white" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
