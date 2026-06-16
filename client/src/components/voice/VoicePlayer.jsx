import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { API_URL } from '../../utils/constants';

const VoicePlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Strip /api from API_URL to get base host for static files
  const baseUrl = API_URL.replace('/api', '');
  const fullSrc = src.startsWith('http') ? src : `${baseUrl}${src}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-dark-900/50 rounded-xl px-3 py-2 min-w-[200px]">
      <audio ref={audioRef} src={fullSrc} preload="metadata" />
      
      <button
        onClick={togglePlayPause}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-600/20 text-primary-400 hover:bg-primary-600/30 transition-colors flex-shrink-0"
      >
        {isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
      </button>

      <div className="flex-1 flex flex-col gap-1">
        {/* Custom Range Slider */}
        <div className="relative h-1.5 bg-dark-700 rounded-full overflow-hidden group cursor-pointer flex items-center">
          <div 
            className="absolute h-full bg-primary-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[10px] text-dark-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VoicePlayer;
