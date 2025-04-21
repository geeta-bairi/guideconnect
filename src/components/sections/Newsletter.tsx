
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend service
    console.log("Newsletter signup:", email);
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-16 bg-travel-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-10 w-10 text-travel-blue mr-3" />
            <h2 className="text-3xl font-bold text-travel-blue">Stay Updated</h2>
          </div>
          
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for travel tips, exclusive guide spotlights, and special offers.
          </p>
          
          {subscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
              Thank you for subscribing! We'll keep you updated with the latest travel insights.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit" className="bg-travel-green hover:bg-travel-green/90 text-white">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
