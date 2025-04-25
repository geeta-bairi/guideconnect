
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, MessageSquare } from "lucide-react";

export const GuideStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
            <Calendar className="text-travel-blue h-8 w-8" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <h3 className="text-2xl font-bold">$0.00</h3>
            </div>
            <DollarSign className="text-travel-green h-8 w-8" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Messages</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
            <MessageSquare className="text-travel-coral h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
