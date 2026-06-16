import { useEffect } from 'react';
import useChat from '../hooks/useChat';
import ChatWindow from '../components/chat/ChatWindow';

const Dashboard = () => {
  const { fetchConversations, activeConversation } = useChat();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-full bg-dark-950">
      {/* On mobile, if a conversation is active, we might hide the sidebar using responsive classes in AppLayout, 
          but for simplicity Dashboard just renders the ChatWindow which takes full remaining space */}
      <ChatWindow />
    </div>
  );
};

export default Dashboard;
