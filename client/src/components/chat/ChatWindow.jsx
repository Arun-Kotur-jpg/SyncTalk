import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Hash, Users, Search, Sparkles, ChevronLeft, UserPlus } from 'lucide-react';
=======
import { Hash, Users, Search, Sparkles, ChevronLeft, UserPlus, Info } from 'lucide-react';
>>>>>>> friend/main
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import SearchMessages from './SearchMessages';
import SummaryPanel from '../summary/SummaryPanel';
import Avatar from '../common/Avatar';
import Loader from '../common/Loader';
import Modal from '../common/Modal';
import { addMember, removeMember } from '../../api/conversations';
import { getUsers } from '../../api/users';

const ChatWindow = () => {
  const { user } = useAuth();
  const {
    activeConversation,
    messages,
    loadingMessages,
    addMessage,
    loadMoreMessages,
    pagination,
    updateMessageTranscription,
    fetchConversations,
  } = useChat();
  const { socket, joinRoom, leaveRoom, isOnline } = useSocket();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
<<<<<<< HEAD

=======
>>>>>>> friend/main
  const [typingUsers, setTypingUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberResults, setMemberResults] = useState([]);

<<<<<<< HEAD
=======
  // Join/leave room on conversation change
>>>>>>> friend/main
  useEffect(() => {
    if (!activeConversation) return;
    joinRoom(activeConversation._id);
    return () => leaveRoom(activeConversation._id);
  }, [activeConversation?._id, joinRoom, leaveRoom]);

<<<<<<< HEAD
=======
  // Listen for new messages
>>>>>>> friend/main
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
<<<<<<< HEAD
      if (message.conversation === activeConversation?._id) addMessage(message);
    };

    const handleTyping = ({ userId, username, conversationId }) => {
      if (conversationId !== activeConversation?._id || userId === user?._id) return;
      setTypingUsers((prev) =>
        prev.some((t) => t.userId === userId) ? prev : [...prev, { userId, username }]
      );
=======
      if (message.conversation === activeConversation?._id) {
        addMessage(message);
      }
    };

    const handleTyping = ({ userId, username, conversationId }) => {
      if (conversationId !== activeConversation?._id) return;
      if (userId === user?._id) return;
      setTypingUsers((prev) => {
        if (prev.some((t) => t.userId === userId)) return prev;
        return [...prev, { userId, username }];
      });
>>>>>>> friend/main
    };

    const handleStopTyping = ({ userId }) => {
      setTypingUsers((prev) => prev.filter((t) => t.userId !== userId));
    };

    socket.on('new_message', handleNewMessage);
    socket.on('user_typing', handleTyping);
    socket.on('user_stop_typing', handleStopTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('user_typing', handleTyping);
      socket.off('user_stop_typing', handleStopTyping);
    };
  }, [socket, activeConversation?._id, addMessage, user?._id]);

<<<<<<< HEAD
=======
  // Clear typing indicators after timeout
>>>>>>> friend/main
  useEffect(() => {
    if (typingUsers.length === 0) return;
    const timer = setTimeout(() => setTypingUsers([]), 3000);
    return () => clearTimeout(timer);
  }, [typingUsers]);

<<<<<<< HEAD
=======
  // Auto-scroll to bottom on new messages
>>>>>>> friend/main
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

<<<<<<< HEAD
=======
  // Scroll-to-top to load more
>>>>>>> friend/main
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    if (messagesContainerRef.current.scrollTop === 0 && pagination?.page < pagination?.pages) {
      loadMoreMessages();
    }
  };

  const handleSearchMembers = async (q) => {
    setMemberSearch(q);
    if (q.length < 2) {
      setMemberResults([]);
      return;
    }
    try {
      const { data } = await getUsers(q);
<<<<<<< HEAD
=======
      // Filter out existing members
>>>>>>> friend/main
      const existingIds = activeConversation.participants.map((p) => p._id);
      setMemberResults(data.filter((u) => !existingIds.includes(u._id)));
    } catch {
      setMemberResults([]);
    }
  };

  const handleAddMember = async (userId) => {
    try {
      await addMember(activeConversation._id, userId);
      await fetchConversations();
      setShowAddMember(false);
      setMemberSearch('');
      setMemberResults([]);
    } catch (err) {
      console.error('Failed to add member:', err);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMember(activeConversation._id, userId);
      await fetchConversations();
    } catch (err) {
      console.error('Failed to remove member:', err);
    }
  };

  if (!activeConversation) {
    return (
<<<<<<< HEAD
      <div className="flex-1 flex flex-col items-center justify-center tg-chat-shell text-[#7c95aa]">
        <div className="w-20 h-20 rounded-3xl bg-[#1a2733] border border-[#2a3c4a] flex items-center justify-center mb-4">
          <Hash size={34} className="text-[#62c8ff]/80" />
        </div>
        <h2 className="text-xl font-semibold text-[#dcedfa] mb-2">Welcome to SyncTalk</h2>
        <p className="text-sm text-[#84a0b3] max-w-sm text-center">
          Pick a conversation to start messaging in Telegram-style view.
=======
      <div className="flex-1 flex flex-col items-center justify-center bg-dark-950 text-dark-500">
        <div className="w-20 h-20 rounded-2xl bg-dark-800/60 flex items-center justify-center mb-4">
          <Hash size={36} className="text-primary-500/50" />
        </div>
        <h2 className="text-xl font-semibold text-dark-300 mb-2">Welcome to SyncTalk</h2>
        <p className="text-sm text-dark-500 max-w-sm text-center">
          Select a conversation or start a new chat to begin collaborating with your team.
>>>>>>> friend/main
        </p>
      </div>
    );
  }

  const isGroup = activeConversation.type === 'group';
  const otherUser = !isGroup
    ? activeConversation.participants?.find((p) => p._id !== user?._id)
    : null;
  const chatName = isGroup ? activeConversation.name : otherUser?.username || 'Unknown';

  return (
<<<<<<< HEAD
    <div className="flex-1 flex flex-col tg-chat-shell relative">
      {/* Header */}
      <div className="tg-chat-header flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#263848] text-[#9ab0c1]"
=======
    <div className="flex-1 flex flex-col bg-dark-950 relative">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-3.5 glass border-b border-dark-700/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="lg:hidden p-1.5 rounded-lg hover:bg-dark-700 text-dark-400"
>>>>>>> friend/main
          >
            <ChevronLeft size={20} />
          </button>

          {isGroup ? (
<<<<<<< HEAD
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#40beff] to-[#219cf6] flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
=======
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600
              flex items-center justify-center text-white font-semibold ring-2 ring-dark-700">
>>>>>>> friend/main
              <Hash size={18} />
            </div>
          ) : (
            <Avatar
              name={chatName}
              src={otherUser?.avatar}
              size="md"
              online={otherUser ? isOnline(otherUser._id) : false}
            />
          )}

<<<<<<< HEAD
          <div className="min-w-0">
            <h2 className="font-semibold text-[#e8f3fb] text-sm truncate">{chatName}</h2>
            <p className="text-xs text-[#8fa5b6]">
=======
          <div>
            <h2 className="font-semibold text-dark-100 text-sm">{chatName}</h2>
            <p className="text-xs text-dark-400">
>>>>>>> friend/main
              {isGroup
                ? `${activeConversation.participants?.length} members`
                : otherUser && isOnline(otherUser._id)
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
<<<<<<< HEAD
            className={`p-2 rounded-lg transition-colors ${
              showSearch
                ? 'bg-[#2a9ceb]/25 text-[#63c6ff]'
                : 'text-[#90a6b8] hover:bg-[#263848] hover:text-[#d9e8f3]'
            }`}
=======
            className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-primary-600/20 text-primary-400' : 'text-dark-400 hover:bg-dark-700/60 hover:text-dark-200'}`}
>>>>>>> friend/main
            title="Search messages"
          >
            <Search size={18} />
          </button>

          {isGroup && (
            <>
              <button
                onClick={() => setShowSummary(!showSummary)}
<<<<<<< HEAD
                className={`p-2 rounded-lg transition-colors ${
                  showSummary
                    ? 'bg-[#2a9ceb]/25 text-[#63c6ff]'
                    : 'text-[#90a6b8] hover:bg-[#263848] hover:text-[#d9e8f3]'
                }`}
=======
                className={`p-2 rounded-lg transition-colors ${showSummary ? 'bg-primary-600/20 text-primary-400' : 'text-dark-400 hover:bg-dark-700/60 hover:text-dark-200'}`}
>>>>>>> friend/main
                title="AI Summary"
              >
                <Sparkles size={18} />
              </button>
              <button
                onClick={() => setShowMembers(!showMembers)}
<<<<<<< HEAD
                className={`p-2 rounded-lg transition-colors ${
                  showMembers
                    ? 'bg-[#2a9ceb]/25 text-[#63c6ff]'
                    : 'text-[#90a6b8] hover:bg-[#263848] hover:text-[#d9e8f3]'
                }`}
=======
                className={`p-2 rounded-lg transition-colors ${showMembers ? 'bg-primary-600/20 text-primary-400' : 'text-dark-400 hover:bg-dark-700/60 hover:text-dark-200'}`}
>>>>>>> friend/main
                title="Members"
              >
                <Users size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
<<<<<<< HEAD
        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
=======
        {/* Messages area */}
        <div className="flex-1 flex flex-col">
>>>>>>> friend/main
          {showSearch && (
            <SearchMessages
              conversationId={activeConversation._id}
              onClose={() => setShowSearch(false)}
            />
          )}

<<<<<<< HEAD
          <div ref={messagesContainerRef} onScroll={handleScroll} className="tg-messages-area">
            {loadingMessages ? (
              <Loader text="Loading messages..." />
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#7f95a7]">
=======
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-1"
          >
            {loadingMessages ? (
              <Loader text="Loading messages..." />
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-dark-500">
>>>>>>> friend/main
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const prevMsg = idx > 0 ? messages[idx - 1] : null;
                const showAvatar =
                  !prevMsg ||
                  prevMsg.sender?._id !== msg.sender?._id ||
                  new Date(msg.createdAt) - new Date(prevMsg.createdAt) > 300000;

                return (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    isOwn={msg.sender?._id === user?._id}
                    showAvatar={showAvatar}
                    onTranscriptionUpdate={updateMessageTranscription}
                  />
                );
              })
            )}
            <TypingIndicator users={typingUsers} />
            <div ref={messagesEndRef} />
          </div>

<<<<<<< HEAD
          <div className="tg-input-wrap">
            <MessageInput />
          </div>
=======
          <MessageInput />
>>>>>>> friend/main
        </div>

        {/* Summary panel */}
        {showSummary && isGroup && (
          <SummaryPanel
            conversationId={activeConversation._id}
            onClose={() => setShowSummary(false)}
          />
        )}

        {/* Members panel */}
        {showMembers && isGroup && (
<<<<<<< HEAD
          <div className="w-72 border-l border-[#243240] bg-[#17212b] overflow-y-auto">
            <div className="p-4 border-b border-[#243240] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#d9e8f3]">
=======
          <div className="w-72 border-l border-dark-700/50 glass overflow-y-auto">
            <div className="p-4 border-b border-dark-700/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark-200">
>>>>>>> friend/main
                Members ({activeConversation.participants?.length})
              </h3>
              <button
                onClick={() => setShowAddMember(true)}
<<<<<<< HEAD
                className="p-1.5 rounded-lg hover:bg-[#243342] text-[#63c6ff]"
=======
                className="p-1.5 rounded-lg hover:bg-dark-700 text-primary-400"
>>>>>>> friend/main
                title="Add member"
              >
                <UserPlus size={16} />
              </button>
            </div>
            <div className="p-2">
              {activeConversation.participants?.map((member) => (
                <div
                  key={member._id}
<<<<<<< HEAD
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#223140]"
=======
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-dark-700/40"
>>>>>>> friend/main
                >
                  <Avatar
                    name={member.username}
                    src={member.avatar}
                    size="sm"
                    online={isOnline(member._id)}
                  />
                  <div className="flex-1 min-w-0">
<<<<<<< HEAD
                    <p className="text-sm text-[#dceaf5] truncate">
                      {member.username}
                      {member._id === user?._id && (
                        <span className="text-[#7f95a7] ml-1">(you)</span>
                      )}
                    </p>
                    <p className="text-[11px] text-[#7f95a7] truncate">{member.status}</p>
                  </div>
                  {activeConversation.createdBy === user?._id && member._id !== user?._id && (
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-xs text-[#8da3b5] hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  )}
=======
                    <p className="text-sm text-dark-200 truncate">
                      {member.username}
                      {member._id === user?._id && (
                        <span className="text-dark-500 ml-1">(you)</span>
                      )}
                    </p>
                    <p className="text-[11px] text-dark-500 truncate">{member.status}</p>
                  </div>
                  {activeConversation.createdBy === user?._id &&
                    member._id !== user?._id && (
                      <button
                        onClick={() => handleRemoveMember(member._id)}
                        className="text-xs text-dark-500 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    )}
>>>>>>> friend/main
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add member modal */}
<<<<<<< HEAD
      <Modal isOpen={showAddMember} onClose={() => setShowAddMember(false)} title="Add Member">
=======
      <Modal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        title="Add Member"
      >
>>>>>>> friend/main
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search users..."
            value={memberSearch}
            onChange={(e) => handleSearchMembers(e.target.value)}
            className="input-field text-sm"
            autoFocus
          />
          <div className="max-h-48 overflow-y-auto space-y-1">
            {memberResults.map((u) => (
              <button
                key={u._id}
                onClick={() => handleAddMember(u._id)}
<<<<<<< HEAD
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#223140] transition-colors"
              >
                <Avatar name={u.username} size="sm" />
                <p className="text-sm text-[#dceaf5]">{u.username}</p>
                <span className="ml-auto text-xs text-[#63c6ff]">+ Add</span>
=======
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-700/60 transition-colors"
              >
                <Avatar name={u.username} size="sm" />
                <p className="text-sm text-dark-200">{u.username}</p>
                <span className="ml-auto text-xs text-primary-400">+ Add</span>
>>>>>>> friend/main
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatWindow;
