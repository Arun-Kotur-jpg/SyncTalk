import { createContext, useState, useCallback } from 'react';
import * as conversationsApi from '../api/conversations';
import * as messagesApi from '../api/messages';

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [pagination, setPagination] = useState(null);

  const fetchConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const { data } = await conversationsApi.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  const selectConversation = useCallback(async (conversation) => {
    setActiveConversation(conversation);
    setMessages([]);
    setLoadingMessages(true);
    try {
      const { data } = await messagesApi.getMessages(conversation._id);
      setMessages(data.messages);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const addMessage = useCallback((message) => {
    setMessages((prev) => {
      // Prevent duplicates
      if (prev.some((m) => m._id === message._id)) return prev;
      return [...prev, message];
    });
  }, []);

  const loadMoreMessages = useCallback(async () => {
    if (!activeConversation || !pagination || pagination.page >= pagination.pages) return;

    try {
      const { data } = await messagesApi.getMessages(
        activeConversation._id,
        pagination.page + 1
      );
      setMessages((prev) => [...data.messages, ...prev]);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to load more messages:', error);
    }
  }, [activeConversation, pagination]);

  const createConversation = useCallback(async (conversationData) => {
    const { data } = await conversationsApi.createConversation(conversationData);
    setConversations((prev) => {
      if (prev.some((c) => c._id === data._id)) return prev;
      return [data, ...prev];
    });
    return data;
  }, []);

  const updateMessageTranscription = useCallback((messageId, transcription) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === messageId ? { ...m, transcription } : m))
    );
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        loadingConversations,
        loadingMessages,
        pagination,
        fetchConversations,
        selectConversation,
        setActiveConversation,
        addMessage,
        loadMoreMessages,
        createConversation,
        setConversations,
        updateMessageTranscription,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
