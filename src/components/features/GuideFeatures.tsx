
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserCog, UserPlus } from "lucide-react";

const features = [
  {
    icon: <UserPlus className="text-travel-blue w-6 h-6" />,
    title: "Grow Your Reach",
    desc: "Connect with global travelers looking for authentic experiences.",
  },
  {
    icon: <UserCog className="text-travel-blue w-6 h-6" />,
    title: "Flexible Income",
    desc: "Set your prices, availability, and tour offerings with full control.",
  },
  {
    icon: <UserCheck className="text-travel-blue w-6 h-6" />,
    title: "Verified Credibility",
    desc: "Show off your expertise and earn trust with verified profiles & reviews.",
  },
];

const GuideFeatures = () => (
  <div className="grid gap-6 md:grid-cols-3 mt-8">
    {features.map((feature) => (
      <Card key={feature.title} className="bg-white shadow md:h-full">
        <CardHeader className="flex flex-row items-center gap-3">
          {feature.icon}
          <CardTitle className="text-base">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{feature.desc}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default GuideFeatures;
