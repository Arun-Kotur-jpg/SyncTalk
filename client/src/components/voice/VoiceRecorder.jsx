import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, X } from 'lucide-react';
import { uploadVoice } from '../../api/voice';

const VoiceRecorder = ({ onSend, onCancel }) => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [uploading, setUploading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      // Pick the best supported MIME type for broad playback compatibility
      const mimeOptions = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ];
      const mimeType = mimeOptions.find((m) => MediaRecorder.isTypeSupported(m)) || '';

      const options = mimeType ? { mimeType } : {};
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: recordedType });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      // Use timeslice of 250ms so data is captured in small chunks reliably
      mediaRecorder.start(250);
      setRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied or error:', err);
      alert('Could not access microphone. Please check permissions.');
      onCancel();
    }
  };

  useEffect(() => {
    startRecording();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpload = async () => {
    if (!audioBlob) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-message.webm');
      const { data } = await uploadVoice(formData);
      onSend(data.voiceUrl);
    } catch (err) {
      console.error('Voice upload failed:', err);
      alert('Failed to upload voice message.');
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full bg-dark-800/80 px-4 py-3 rounded-xl border border-dark-700/50">
      <button
        onClick={onCancel}
        disabled={uploading}
        className="p-2 text-dark-400 hover:text-red-400 transition-colors disabled:opacity-50"
      >
        <X size={20} />
      </button>

      <div className="flex-1 flex items-center justify-center gap-4">
        {recording ? (
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-medium font-mono">{formatTime(recordingTime)}</span>
          </div>
        ) : audioBlob ? (
          <span className="text-primary-400 font-medium">Ready to send ({formatTime(recordingTime)})</span>
        ) : (
          <span className="text-dark-400 text-sm">Click mic to start recording</span>
        )}
      </div>

      {!recording && !audioBlob ? (
        <button
          onClick={startRecording}
          className="p-3 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
        >
          <Mic size={20} />
        </button>
      ) : recording ? (
        <button
          onClick={stopRecording}
          className="p-3 bg-dark-700 text-dark-200 rounded-full hover:bg-dark-600 transition-colors"
        >
          <Square size={20} className="fill-current" />
        </button>
      ) : (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="p-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full
            hover:from-primary-500 hover:to-primary-400 transition-all disabled:opacity-50
            flex items-center justify-center"
        >
          {uploading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;
