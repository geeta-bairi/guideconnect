
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
  sender_full_name?: string;
  receiver_full_name?: string;
}

export const MessagesList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;
        
        const userId = userData.user.id;
        
        // Get messages where the user is sender or receiver
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *
          `)
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Fetch profile names in a separate query for sender and receiver
        const userIds = new Set<string>();
        data?.forEach(msg => {
          userIds.add(msg.sender_id);
          userIds.add(msg.receiver_id);
        });
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', Array.from(userIds));
          
        if (profileError) throw profileError;
        
        // Create a map of user IDs to full names
        const userMap = new Map<string, string>();
        profileData?.forEach(profile => {
          userMap.set(profile.id, profile.full_name || 'Unknown');
        });
        
        // Map the messages with profile names
        const typedMessages: Message[] = (data || []).map(msg => ({
          id: msg.id,
          content: msg.content,
          sender_id: msg.sender_id,
          receiver_id: msg.receiver_id,
          created_at: msg.created_at || '',
          read: msg.read || false,
          sender_full_name: userMap.get(msg.sender_id) || 'Unknown',
          receiver_full_name: userMap.get(msg.receiver_id) || 'Unknown'
        }));
        
        setMessages(typedMessages);
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
                    {message.sender_full_name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{message.content}</p>
                {!message.read && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                      New
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
