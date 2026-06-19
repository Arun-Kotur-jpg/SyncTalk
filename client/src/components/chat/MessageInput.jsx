import { useState, useRef, useCallback, useEffect } from 'react';
import { Send, Mic, Smile, X } from 'lucide-react';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';
import useAuth from '../../hooks/useAuth';
import VoiceRecorder from '../voice/VoiceRecorder';

// Grouped emoji set — common ones a college student would actually use
const EMOJI_DATA = {
  'Smileys': ['😀','😂','🥲','😊','😎','🤩','😍','🥳','😤','😭','🤣','😅','🤔','🫡','🤗','😴','🙄','😬','🤯','🥺','😈','💀','🤡','👻','😶‍🌫️'],
  'Hands': ['👍','👎','👋','🤝','🙌','👏','✌️','🤞','🫶','💪','🫰','🤙','👊','✋','🖐️'],
  'Hearts': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','💔','❤️‍🔥','💕','💖','💗'],
  'Objects': ['🔥','⭐','✨','🎉','🎊','💯','🏆','🎯','💡','📌','🚀','⚡','🛠️','📦','🧪'],
  'Reactions': ['✅','❌','⚠️','❓','💬','👀','🫣','🤫','🤐','😶','🙊','🙈','🙉'],
};

const EmojiPicker = ({ onSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState('Smileys');
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-full mb-2 right-0 w-72 bg-dark-800 border border-dark-700/60 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {/* Category tabs */}
      <div className="flex gap-1 px-2 pt-2 pb-1 border-b border-dark-700/40 overflow-x-auto">
        {Object.keys(EMOJI_DATA).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors
              ${activeTab === cat
                ? 'bg-primary-500/20 text-primary-300 font-medium'
                : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Emoji grid */}
      <div className="p-2 h-44 overflow-y-auto">
        <div className="grid grid-cols-8 gap-0.5">
          {EMOJI_DATA[activeTab].map((emoji, i) => (
            <button
              key={i}
              onClick={() => onSelect(emoji)}
              className="w-8 h-8 flex items-center justify-center text-lg rounded-md
                hover:bg-dark-700/60 transition-colors cursor-pointer"
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MessageInput = () => {
  const { activeConversation } = useChat();
  const { sendMessage, emitTyping, emitStopTyping } = useSocket();
  const { user } = useAuth();

  const [text, setText] = useState('');
  const [showRecorder, setShowRecorder] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const typingTimeout = useRef(null);
  const textareaRef = useRef(null);

  const handleEmojiSelect = useCallback((emoji) => {
    setText((prev) => prev + emoji);
    // Keep focus on textarea after picking
    textareaRef.current?.focus();
  }, []);

  const handleSend = useCallback(() => {
    if (!text.trim() || !activeConversation) return;

    // Parse @mentions from text
    const mentionRegex = /@(\w+)/g;
    const mentionedUsernames = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentionedUsernames.push(match[1]);
    }

    // Find matching participant IDs
    const mentions = activeConversation.participants
      ?.filter((p) => mentionedUsernames.includes(p.username))
      .map((p) => p._id) || [];

    sendMessage({
      conversationId: activeConversation._id,
      content: text.trim(),
      type: 'text',
      mentions,
    });

    setText('');
    setShowEmojiPicker(false);
    emitStopTyping(activeConversation._id);
  }, [text, activeConversation, sendMessage, emitStopTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);

    if (!activeConversation) return;

    // Typing indicator logic
    emitTyping(activeConversation._id);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      emitStopTyping(activeConversation._id);
    }, 2000);
  };

  const handleVoiceSent = (voiceUrl) => {
    if (!activeConversation) return;
    sendMessage({
      conversationId: activeConversation._id,
      content: '',
      type: 'voice',
      voiceUrl,
    });
    setShowRecorder(false);
  };

  if (!activeConversation) return null;

  return (
    <div className="px-6 py-4 glass border-t border-dark-700/50">
      {showRecorder ? (
        <VoiceRecorder
          onSend={handleVoiceSent}
          onCancel={() => setShowRecorder(false)}
        />
      ) : (
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (@ to mention)"
              rows={1}
              className="w-full bg-dark-800/80 border border-dark-700/50 text-dark-100
                px-4 py-3 rounded-xl resize-none
                placeholder:text-dark-500
                focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/40
                transition-all duration-200 text-sm leading-relaxed
                max-h-32 overflow-y-auto"
              style={{ minHeight: '46px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Emoji button */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className={`p-3 rounded-xl border transition-all duration-200
                ${showEmojiPicker
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-400'
                  : 'bg-dark-800/80 border-dark-700/50 text-dark-400 hover:text-primary-400 hover:border-primary-500/30'
                }`}
              title="Emoji"
            >
              <Smile size={18} />
            </button>

            {showEmojiPicker && (
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>

          {/* Voice button */}
          <button
            onClick={() => setShowRecorder(true)}
            className="p-3 rounded-xl bg-dark-800/80 border border-dark-700/50 text-dark-400
              hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200"
            title="Record voice"
          >
            <Mic size={18} />
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white
              hover:from-primary-500 hover:to-primary-400 disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg shadow-primary-600/20"
            title="Send"
          >
            <Send size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
