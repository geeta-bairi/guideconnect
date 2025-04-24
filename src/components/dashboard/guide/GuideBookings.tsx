
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GuideBookings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-gray-500">No booking requests yet. Complete your profile to attract travelers!</p>
        </div>
      </CardContent>
    </Card>
  );
};
