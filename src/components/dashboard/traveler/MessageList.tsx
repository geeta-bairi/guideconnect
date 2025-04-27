import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";


export const MessageList = () => {
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);

      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          sender_id,
          receiver_id,
          booking:booking_id (
            id,
            booking_date,
            start_time,
            end_time,
            price,
            status
          ),
          sender:sender_id (
            id,
            phone,
            full_name
          ),
          receiver:receiver_id (
            id,
            phone,
            full_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      {loadingMessages ? (
        <p>Loading messages...</p>
      ) : messages.length > 0 ? (
        <ul>
          {messages.map((message) => {
            const booking = message.booking;
            const receiverName = message.receiver?.full_name || "there";
            const contactPhone = message.sender?.phone || message.receiver?.phone;

            return (
              <li key={message.id} className="message-item" style={{ marginBottom: "20px" }}>
                <p>
                  <strong>{`Hello ${receiverName},`}</strong><br />
                  {`I have booked you for `}
                  {booking?.booking_date
                    ? `${new Date(booking.booking_date).toLocaleDateString()}`
                    : "a date not available"}
                  {booking?.start_time && booking?.end_time && (
                    <> from {booking.start_time} to {booking.end_time}.</>
                  )}
                  <br />
                  {booking?.price && (
                    <>The total price is ${booking.price.toFixed(2)}.<br /></>
                  )}
                  Looking forward to meeting you!
                </p>

                {/* Show extra message if booking is confirmed */}
                {booking?.status === "confirmed" && contactPhone && (
                  <p style={{ marginTop: "8px", color: "green" }}>
                    Your booking is confirmed! Contact me at:{" "}
                    <a href={`tel:${contactPhone}`}>
                      {contactPhone}
                    </a>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No messages yet. Start contacting guides!</p>
      )}
    </div>
  );
};
