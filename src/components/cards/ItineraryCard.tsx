
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface ItineraryCardProps {
  title: string;
  location: string;
  image: string;
  duration: string;
  groupSize: string;
  categories: string[];
  description: string;
}

const ItineraryCard = ({
  title,
  location,
  image,
  duration,
  groupSize,
  categories,
  description,
}: ItineraryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <div className="relative aspect-video">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{location}</p>
        
        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{groupSize}</span>
          </div>
        </div>
        
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ItineraryCard;
