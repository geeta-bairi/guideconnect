
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [userType, setUserType] = useState<"traveler" | "guide">("traveler");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would register the user and redirect based on userType
    console.log("Registration attempted as:", userType);
    
    // For demo purposes only - in production you'd use actual auth
    if (userType === "traveler") {
      window.location.href = "/traveler-dashboard";
    } else {
      window.location.href = "/guide-dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gray">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-travel-blue">Register</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">I want to join as a:</h3>
            <RadioGroup 
              defaultValue="traveler" 
              className="flex space-x-4"
              value={userType}
              onValueChange={(value) => setUserType(value as "traveler" | "guide")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="traveler" id="traveler-reg" />
                <Label htmlFor="traveler-reg">Traveler</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guide" id="guide-reg" />
                <Label htmlFor="guide-reg">Guide</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Input type="text" placeholder="Full Name" required />
          </div>
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            <Input type="password" placeholder="Password" required />
          </div>
          {userType === "guide" && (
            <div>
              <Input type="text" placeholder="Your Specialty (e.g., Historical, Food, Adventure)" />
            </div>
          )}
          <Button className="w-full bg-travel-green hover:bg-travel-green/90 text-white" type="submit">
            Register
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">Google</Button>
          <Button variant="outline" className="w-full">Facebook</Button>
        </div>
        
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-travel-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
