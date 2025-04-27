import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
}

export function GuideMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      setLoading(true);

      // Fetch messages sent TO this guide
      const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        sender_id,
        receiver_id,
        sender:sender_id (
          id,
          full_name
        )
      `)
      .order('created_at', { ascending: true });
    

      if (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const formatted = data.map((msg) => ({
          id: msg.id,
          content: msg.content,
          sender_id: msg.sender_id,
          sender_name: msg.sender?.full_name || "123",
          created_at: msg.created_at,
        }));

        setMessages(formatted);
      }
      setLoading(false);
    };

    fetchMessages();

    const subscription = supabase
      .channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  if (loading) return <div>Loading messages...</div>;
  if (!messages.length) return <div>No messages yet!</div>;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="p-4 rounded-lg shadow bg-gray-100">
          <div className="flex justify-between mb-2">
            <div className="font-bold">{msg.sender_name}</div>
            <div className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</div>
          </div>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
}
