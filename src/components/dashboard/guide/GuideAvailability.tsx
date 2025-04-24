
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GuideAvailability = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Available Days</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline">Monday</Button>
            <Button variant="outline">Tuesday</Button>
            <Button variant="outline">Wednesday</Button>
            <Button variant="outline">Thursday</Button>
            <Button variant="outline">Friday</Button>
            <Button variant="outline">Saturday</Button>
            <Button variant="outline">Sunday</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-500">Start Time</label>
              <input className="w-full p-2 border rounded" type="time" defaultValue="09:00" />
            </div>
            <div>
              <label className="text-sm text-gray-500">End Time</label>
              <input className="w-full p-2 border rounded" type="time" defaultValue="17:00" />
            </div>
          </div>
          
          <h3 className="font-medium mb-2">Unavailable Dates</h3>
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">From</label>
                <input className="w-full p-2 border rounded" type="date" />
              </div>
              <div>
                <label className="text-sm text-gray-500">To</label>
                <input className="w-full p-2 border rounded" type="date" />
              </div>
            </div>
          </div>
          
          <Button className="bg-travel-green hover:bg-travel-green/90">Save Availability</Button>
        </div>
      </CardContent>
    </Card>
  );
};
