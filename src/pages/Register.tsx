
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gray">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-travel-blue">Register</h1>
        <form className="space-y-4">
          <div>
            <Input type="text" placeholder="Full Name" required />
          </div>
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            <Input type="password" placeholder="Password" required />
          </div>
          <Button className="w-full bg-travel-green hover:bg-travel-green/90 text-white" type="submit">
            Register
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-travel-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
