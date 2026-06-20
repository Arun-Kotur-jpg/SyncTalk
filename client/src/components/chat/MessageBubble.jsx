import { useState } from 'react';
import Avatar from '../common/Avatar';
import VoicePlayer from '../voice/VoicePlayer';
import { formatTime } from '../../utils/formatDate';
import { transcribeVoice } from '../../api/voice';
import { FileText, Reply, Check, CheckCheck } from 'lucide-react';

const MessageBubble = ({ message, isOwn, showAvatar, onTranscriptionUpdate, isHighlighted }) => {
  const [transcribing, setTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState('');

  const handleTranscribe = async () => {
    setTranscribing(true);
    setTranscribeError('');
    try {
      const { data } = await transcribeVoice(message._id);
      if (onTranscriptionUpdate) onTranscriptionUpdate(message._id, data.transcription);
    } catch (err) {
      setTranscribeError(err.response?.data?.message || 'Transcription failed');
    } finally {
      setTranscribing(false);
    }
  };

  if (message?.type === 'system') {
    return (
      <div id={`msg-${message._id}`} className="flex justify-center py-2">
        <span className="text-xs text-dark-500 bg-dark-800/40 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  if (message?.type === 'summary') {
    return (
      <div id={`msg-${message._id}`} className={`flex justify-center py-3 ${isHighlighted ? 'ring-2 ring-primary-500 rounded-xl' : ''}`}>
        <div className="bg-primary-600/10 border border-primary-500/20 rounded-xl px-4 py-3 max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={14} className="text-primary-400" />
            <span className="text-xs font-medium text-primary-400">AI Summary</span>
          </div>
          <p className="text-sm text-dark-200 whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`msg-${message._id}`}
      className={`flex gap-2.5 ${isOwn ? 'flex-row-reverse' : ''} ${showAvatar ? 'mt-3' : 'mt-0.5'}
        animate-fade-in ${isHighlighted ? 'bg-primary-500/10 rounded-xl p-2 -mx-2 ring-1 ring-primary-500/50' : ''}`}
    >
      {/* Avatar */}
      <div className="w-8 flex-shrink-0">
        {showAvatar && !isOwn && (
          <Avatar name={message.sender?.username} src={message.sender?.avatar} size="sm" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender name */}
        {showAvatar && !isOwn && (
          <p className="text-xs font-medium text-primary-400 mb-1 ml-1">
            {message.sender?.username}
          </p>
        )}

        {/* Reply reference */}
        {message.replyTo && (
          <div className={`flex items-center gap-1.5 mb-1 ${isOwn ? 'justify-end' : ''}`}>
            <Reply size={12} className="text-dark-500" />
            <span className="text-xs text-dark-500 truncate max-w-[200px]">
              {message.replyTo.content}
            </span>
          </div>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOwn
              ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-tr-md'
              : 'bg-dark-800/80 text-dark-100 rounded-tl-md border border-dark-700/40'
          }`}
        >
          {/* Text content */}
          {message.content && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {/* Voice message */}
          {message.type === 'voice' && message.voiceUrl && (
            <div className="mt-1">
              <VoicePlayer src={message.voiceUrl} />

              {/* Transcription */}
              {message.transcription ? (
                <div className="mt-2 pt-2 border-t border-dark-600/30">
                  <p className="text-xs text-dark-400 mb-0.5">Transcription:</p>
                  <p className="text-sm text-dark-200">{message.transcription}</p>
                </div>
              ) : (
                <button
                  onClick={handleTranscribe}
                  disabled={transcribing}
                  className={`mt-2 text-xs font-medium flex items-center gap-1.5 transition-colors
                    ${isOwn ? 'text-primary-200 hover:text-white' : 'text-primary-400 hover:text-primary-300'}
                    disabled:opacity-50`}
                >
                  <FileText size={12} />
                  {transcribing ? 'Transcribing...' : 'Transcribe'}
                </button>
              )}

              {transcribeError && (
                <p className="text-xs text-red-400 mt-1">{transcribeError}</p>
              )}
            </div>
          )}

          {/* Mentions */}
          {message.mentions?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {message.mentions.map((m) => (
                <span
                  key={m._id || m}
                  className="text-xs bg-primary-500/20 text-primary-300 px-1.5 py-0.5 rounded"
                >
                  @{m.username || m}
                </span>
              ))}
            </div>
          )}

          {/* Timestamp + read status */}
          <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
            <span className={`text-[10px] ${isOwn ? 'text-primary-200/60' : 'text-dark-500'}`}>
              {formatTime(message.createdAt)}
            </span>
            {isOwn && (
              <span className="text-primary-200/60">
                {message.readBy?.length > 1 ? <CheckCheck size={12} /> : <Check size={12} />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
