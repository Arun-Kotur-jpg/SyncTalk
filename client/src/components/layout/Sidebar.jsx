import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  Users,
  Search,
  Settings,
  LogOut,
  Plus,
  Bell,
  Hash,
  User,
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';
import Avatar from '../common/Avatar';
import Modal from '../common/Modal';
import MentionsInbox from '../mentions/MentionsInbox';
import { formatDate } from '../../utils/formatDate';
import { getUsers } from '../../api/users';
import { CONVERSATION_TYPES } from '../../utils/constants';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { conversations, activeConversation, selectConversation, createConversation, fetchConversations } = useChat();
  const { isOnline, notifications } = useSocket();

  const [showNewChat, setShowNewChat] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [sidebarFilter, setSidebarFilter] = useState('');

  const handleSearchUsers = async (q) => {
    setSearchQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const { data } = await getUsers(q);
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleStartDM = async (otherUser) => {
    try {
      const conv = await createConversation({
        type: 'direct',
        participants: [otherUser._id],
      });
      setShowNewChat(false);
      setSearchQuery('');
      setSearchResults([]);
      await selectConversation(conv);
      navigate('/chat');
    } catch (err) {
      console.error('Failed to create DM:', err);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0) return;
    try {
      const conv = await createConversation({
        type: 'group',
        name: groupName,
        description: groupDesc,
        participants: selectedMembers.map((m) => m._id),
      });
      setShowNewGroup(false);
      setGroupName('');
      setGroupDesc('');
      setSelectedMembers([]);
      await selectConversation(conv);
      navigate('/chat');
    } catch (err) {
      console.error('Failed to create group:', err);
    }
  };

  const toggleMember = (u) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m._id === u._id)
        ? prev.filter((m) => m._id !== u._id)
        : [...prev, u]
    );
  };

  const getConversationName = (conv) => {
    if (conv.type === 'group') return conv.name;
    const other = conv.participants?.find((p) => p._id !== user?._id);
    return other?.username || 'Unknown';
  };

  const getConversationAvatar = (conv) => {
    if (conv.type === 'group') return null;
    const other = conv.participants?.find((p) => p._id !== user?._id);
    return other?.avatar;
  };

  const getOtherUserId = (conv) => {
    if (conv.type !== 'direct') return null;
    const other = conv.participants?.find((p) => p._id !== user?._id);
    return other?._id;
  };

  const filteredConversations = conversations.filter((c) => {
    if (!sidebarFilter) return true;
    const name = getConversationName(c).toLowerCase();
    return name.includes(sidebarFilter.toLowerCase());
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <aside className="w-80 h-screen flex flex-col glass border-r border-dark-700/50">
        {/* User header */}
        <div className="p-4 border-b border-dark-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar name={user?.username} size="md" online={true} />
              <div>
                <p className="font-semibold text-dark-100 text-sm">{user?.username}</p>
                <p className="text-xs text-dark-400 truncate max-w-[120px]">{user?.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 rounded-lg hover:bg-dark-700/60 text-dark-400 hover:text-dark-200 transition-colors"
                title="Settings"
              >
                <Settings size={18} />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowMentions(true)}
                  className="p-2 rounded-lg hover:bg-dark-700/60 text-dark-400 hover:text-dark-200 transition-colors"
                  title="Mentions"
                >
                  <Bell size={18} />
                </button>
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={sidebarFilter}
              onChange={(e) => setSidebarFilter(e.target.value)}
              className="w-full bg-dark-800/80 border border-dark-700/50 text-dark-200 pl-9 pr-3 py-2 rounded-lg text-sm
                placeholder:text-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all"
            />
          </div>
        </div>

        {/* New chat buttons */}
        <div className="px-4 py-3 flex gap-2 border-b border-dark-700/30">
          <button
            onClick={() => setShowNewChat(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary-600/20 text-primary-300
              hover:bg-primary-600/30 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            New Chat
          </button>
          <button
            onClick={() => {
              setShowNewGroup(true);
              handleSearchUsers('');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-700/50 text-dark-300
              hover:bg-dark-700 transition-colors text-sm font-medium"
          >
            <Users size={16} />
            New Group
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-dark-500 px-6">
              <MessageSquare size={40} className="mb-3 opacity-40" />
              <p className="text-sm text-center">No conversations yet. Start a new chat!</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = activeConversation?._id === conv._id;
              const name = getConversationName(conv);
              const otherUserId = getOtherUserId(conv);

              return (
                <button
                  key={conv._id}
                  onClick={async () => {
                    await selectConversation(conv);
                    navigate('/chat');
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150
                    ${isActive ? 'bg-primary-600/15 border-l-2 border-primary-500' : 'hover:bg-dark-800/60 border-l-2 border-transparent'}`}
                >
                  <div className="relative">
                    {conv.type === 'group' ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600
                        flex items-center justify-center text-white font-semibold text-sm ring-2 ring-dark-700">
                        <Hash size={18} />
                      </div>
                    ) : (
                      <Avatar
                        name={name}
                        src={getConversationAvatar(conv)}
                        size="md"
                        online={otherUserId ? isOnline(otherUserId) : false}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-primary-300' : 'text-dark-200'}`}>
                        {name}
                      </p>
                      <span className="text-[11px] text-dark-500 ml-2 flex-shrink-0">
                        {formatDate(conv.updatedAt)}
                      </span>
                    </div>
                    {conv.type === 'group' && (
                      <p className="text-xs text-dark-500 truncate mt-0.5">
                        {conv.participants?.length} members
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-dark-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-dark-400
              hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* New DM Modal */}
      <Modal isOpen={showNewChat} onClose={() => setShowNewChat(false)} title="New Conversation">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={16} />
            <input
              type="text"
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => handleSearchUsers(e.target.value)}
              className="input-field pl-10 text-sm"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {searching && <p className="text-sm text-dark-400 text-center py-4">Searching...</p>}
            {!searching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <p className="text-sm text-dark-400 text-center py-4">No users found</p>
            )}
            {searchResults.map((u) => (
              <button
                key={u._id}
                onClick={() => handleStartDM(u)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-dark-700/60 transition-colors"
              >
                <Avatar name={u.username} src={u.avatar} size="sm" online={isOnline(u._id)} />
                <div className="text-left">
                  <p className="text-sm font-medium text-dark-200">{u.username}</p>
                  <p className="text-xs text-dark-500">{u.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* New Group Modal */}
      <Modal isOpen={showNewGroup} onClose={() => setShowNewGroup(false)} title="Create Group" maxWidth="max-w-xl">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Group name *"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="input-field text-sm"
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
            className="input-field text-sm"
          />

          {/* Selected members */}
          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((m) => (
                <span
                  key={m._id}
                  className="badge flex items-center gap-1.5 pr-1.5"
                >
                  {m.username}
                  <button onClick={() => toggleMember(m)} className="hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search members */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={16} />
            <input
              type="text"
              placeholder="Search members to add..."
              value={searchQuery}
              onChange={(e) => handleSearchUsers(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1">
            {searchResults.map((u) => {
              const isSelected = selectedMembers.some((m) => m._id === u._id);
              return (
                <button
                  key={u._id}
                  onClick={() => toggleMember(u)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isSelected ? 'bg-primary-600/20' : 'hover:bg-dark-700/60'}`}
                >
                  <Avatar name={u.username} src={u.avatar} size="sm" />
                  <p className="text-sm text-dark-200">{u.username}</p>
                  {isSelected && <span className="ml-auto text-primary-400 text-xs">✓ Added</span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedMembers.length === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Group ({selectedMembers.length} members)
          </button>
        </div>
      </Modal>

      {showMentions && (
        <MentionsInbox onClose={() => setShowMentions(false)} />
      )}
    </>
  );
};

export default Sidebar;
