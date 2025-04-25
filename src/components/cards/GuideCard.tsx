
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface GuideCardProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  price: string;
  languages: string[];
  specialties: string[];
  verified: boolean;
}

const GuideCard = ({
  name,
  location,
  image,
  rating,
  price,
  languages,
  specialties,
  verified,
}: GuideCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={`${name} - Local Guide`}
          className="h-full w-full object-cover"
        />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-travel-blue">
            Verified
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{location}</p>
        
        <div className="space-y-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Languages</p>
            <div className="flex flex-wrap gap-1">
              {languages.map((language) => (
                <Badge key={language} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-muted-foreground mb-1">Specialties</p>
            <div className="flex flex-wrap gap-1">
              {specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="font-semibold text-travel-blue">{price}</p>
        </div>
        <Button size="sm">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default GuideCard;
