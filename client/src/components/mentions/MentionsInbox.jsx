import { useEffect, useState } from 'react';
import { AtSign, MessageSquare, X } from 'lucide-react';
import { getMentions } from '../../api/messages';
import Avatar from '../common/Avatar';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/formatDate';
import useChat from '../../hooks/useChat';
import { useNavigate } from 'react-router-dom';

const MentionsInbox = ({ onClose }) => {
  const [mentions, setMentions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectConversation, setHighlightMessageId } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentions = async () => {
      try {
        const { data } = await getMentions();
        setMentions(data);
      } catch (error) {
        console.error('Failed to fetch mentions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentions();
  }, []);

  const handleMentionClick = async (message) => {
    if (!message.conversation) return;
    
    // Set the highlight ID so ChatWindow knows to scroll/glow
    setHighlightMessageId(message._id);
    
    // Select the conversation
    await selectConversation(message.conversation);
    
    navigate('/chat');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-dark-700/60 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-700/50">
          <div className="flex items-center gap-2 text-dark-100">
            <AtSign size={18} className="text-primary-400" />
            <h2 className="font-semibold text-lg">Your Mentions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader text="Loading mentions..." />
            </div>
          ) : mentions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-dark-500">
              <AtSign size={40} className="mb-3 opacity-20" />
              <p className="text-sm">You haven't been mentioned yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {mentions.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => handleMentionClick(msg)}
                  className="w-full text-left p-3 rounded-xl hover:bg-dark-800/60 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={msg.sender?.username} src={msg.sender?.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-dark-200 truncate">
                            {msg.sender?.username}
                          </span>
                          <span className="text-xs text-dark-500 bg-dark-800 px-1.5 py-0.5 rounded-md truncate max-w-[100px]">
                            {msg.conversation?.name || 'Direct Message'}
                          </span>
                        </div>
                        <span className="text-[10px] text-dark-500 flex-shrink-0">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-dark-400 truncate group-hover:text-dark-300 transition-colors">
                        {msg.content || (msg.type === 'voice' ? '🎤 Voice message' : 'Sent an attachment')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentionsInbox;
