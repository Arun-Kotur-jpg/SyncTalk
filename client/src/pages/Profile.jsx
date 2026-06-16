import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User as UserIcon, Smile } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { updateProfile } from '../api/users';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [status, setStatus] = useState(user?.status || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data } = await updateProfile({ username, status, avatar });
      updateUser(data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-dark-950 overflow-y-auto">
      <div className="px-6 py-4 glass border-b border-dark-700/50 flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-dark-700/60 text-dark-400 hover:text-dark-100 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-dark-100">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto w-full p-6 py-10 animate-fade-in">
        <form onSubmit={handleSave} className="card space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative group cursor-pointer">
              <Avatar name={username} src={avatar} size="xl" />
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="text-xs text-dark-400">Avatar URL (Optional)</p>
              <input
                type="text"
                placeholder="https://example.com/avatar.jpg"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="mt-2 text-sm bg-transparent border-b border-dark-700 focus:border-primary-500 outline-none px-2 py-1 text-center text-dark-200 placeholder-dark-600 w-64 transition-colors"
              />
            </div>
          </div>

          <div className="h-px bg-dark-700/50 w-full" />

          {/* Form Fields */}
          <div className="space-y-5">
            <Input
              label="Username"
              icon={UserIcon}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Input
              label="Status"
              icon={Smile}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="What are you working on?"
              maxLength={100}
            />
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm text-center ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button type="submit" loading={loading} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
