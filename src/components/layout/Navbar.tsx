
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-travel-blue">
              Guide<span className="text-travel-green">Connect</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link to="/explore-guides" className="text-sm font-medium hover:text-primary">
            Explore Guides
          </Link>
          <Link to="/destinations" className="text-sm font-medium hover:text-primary">
            Destinations
          </Link>
          <Link to="/testimonials" className="text-sm font-medium hover:text-primary">
            Testimonials
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
