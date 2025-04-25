
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  sender: { full_name: string };
  receiver: { full_name: string };
}

export const MessagesList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            sender:sender_id(full_name),
            receiver:receiver_id(full_name)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [toast]);

  if (isLoading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('messages')}</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">{t('noMessagesYet')}</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {message.sender?.full_name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{message.content}</p>
                {!message.read && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                      {t('new')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
