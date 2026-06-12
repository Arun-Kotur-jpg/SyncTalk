import { useState, useEffect } from 'react';
import { Search, X, Calendar } from 'lucide-react';
import { searchMessages } from '../../api/messages';
import { formatDate } from '../../utils/formatDate';
import Avatar from '../common/Avatar';
import Loader from '../common/Loader';

const SearchMessages = ({ conversationId, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      setError(null);
      try {
        const { data } = await searchMessages(conversationId, query);
        setResults(data);
      } catch (err) {
        setError('Search failed. Please try again.');
      } finally {
        setSearching(false);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query, conversationId]);

  return (
    <div className="absolute top-16 right-0 w-80 h-[calc(100%-4rem)] z-10 glass border-l border-dark-700/50 shadow-2xl animate-slide-in-right flex flex-col">
      <div className="p-4 border-b border-dark-700/50 flex justify-between items-center">
        <h3 className="font-semibold text-dark-100 text-sm">Search Messages</h3>
        <button onClick={onClose} className="p-1 text-dark-400 hover:text-dark-100 transition-colors">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4 border-b border-dark-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" size={16} />
          <input
            type="text"
            placeholder="Search conversation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-9 text-sm"
            autoFocus
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {searching ? (
          <Loader size="sm" text="Searching..." />
        ) : error ? (
          <p className="text-sm text-red-400 text-center p-4">{error}</p>
        ) : query.length >= 2 && results.length === 0 ? (
          <p className="text-sm text-dark-400 text-center p-4">No results found for "{query}"</p>
        ) : query.length < 2 ? (
          <p className="text-sm text-dark-500 text-center p-4">Type at least 2 characters to search</p>
        ) : (
          <div className="space-y-2">
            {results.map((msg) => (
              <div key={msg._id} className="p-3 rounded-lg hover:bg-dark-800 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Avatar name={msg.sender?.username} size="sm" />
                    <span className="text-xs font-medium text-dark-200">{msg.sender?.username}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-dark-500">
                    <Calendar size={10} />
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
                <p className="text-sm text-dark-300 line-clamp-2 mt-1 break-words">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMessages;
