
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GuideMessages = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-gray-500">No messages yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};
