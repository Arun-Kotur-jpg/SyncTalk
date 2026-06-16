import { Link } from 'react-router-dom';
import { MessageSquare, Zap, Shield, Users, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 flex flex-col font-sans overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
            <span className="font-bold text-white text-lg leading-none">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">SyncTalk</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-dark-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800/80 border border-dark-700 mb-8 animate-fade-in">
          <Sparkles size={14} className="text-primary-400" />
          <span className="text-xs font-medium text-dark-200">Now with AI Chat Summaries</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl animate-slide-up">
          Coordinate your team <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-violet-500">
            without the noise.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-dark-400 max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Secure, real-time communication built for software projects. Context-aware voice messages, instant AI summaries, and zero distractions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Start chatting for free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#features" className="btn-secondary px-8 py-3 w-full sm:w-auto flex items-center justify-center">
            View features
          </a>
        </div>
      </main>

      {/* Features grid */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-24 z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap}
            title="Real-time speed"
            desc="Socket.IO powered instant messaging. Zero latency, instant delivery and read receipts."
          />
          <FeatureCard 
            icon={Sparkles}
            title="AI Summaries"
            desc="Catch up in seconds. One click summarizes 100s of messages into actionable bullet points."
          />
          <FeatureCard 
            icon={Shield}
            title="Secure by design"
            desc="JWT auth, strict membership checks, and safe media storage. Your team's data is locked down."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="glass p-8 rounded-3xl border border-dark-700/50 hover:bg-dark-800/80 transition-colors group">
    <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-primary-400" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-dark-100">{title}</h3>
    <p className="text-dark-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
