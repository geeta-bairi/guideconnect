
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserRoundSearch, UserRoundCheck } from "lucide-react";

const features = [
  {
    icon: <UserRoundSearch className="text-travel-blue w-6 h-6"/>,
    title: "Discover Local Experts",
    desc: "Easily connect with local guides for a personalized, authentic adventure.",
  },
  {
    icon: <Users className="text-travel-blue w-6 h-6"/>,
    title: "Diverse Experiences",
    desc: "Choose from cultural, adventure, food & nature tours made just for you.",
  },
  {
    icon: <UserRoundCheck className="text-travel-blue w-6 h-6"/>,
    title: "Trusted Community",
    desc: "All guides are verified, reviewed, and community-rated for safety and quality.",
  },
];

const UserFeatures = () => (
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

export default UserFeatures;
