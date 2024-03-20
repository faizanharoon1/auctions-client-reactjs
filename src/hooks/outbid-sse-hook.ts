import { useEffect, useState } from 'react';
export const useSSE = (url: string) => {
  const [messages, setMessages] = useState<string>('');

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      console.log("EventSource :", event);
     // const newMessage = JSON.parse(event.data);
      setMessages(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
      setMessages('')
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return messages;
};
