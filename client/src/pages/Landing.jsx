import { Link } from 'react-router-dom';
import { Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-50 flex flex-col font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-dark-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
            <span className="font-bold text-white text-lg leading-none">S</span>
          </div>
          <span className="text-xl font-bold">SyncTalk</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-dark-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800 border border-dark-700 mb-6">
          <Sparkles size={14} className="text-primary-400" />
          <span className="text-xs font-medium text-dark-300">Now with AI Chat Summaries</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 max-w-3xl">
          Coordinate your team <br/>
          <span className="text-primary-400">
            without the noise.
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-dark-400 max-w-xl mb-8">
          Secure, real-time communication built for software projects. Context-aware voice messages, instant AI summaries, and zero distractions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Start chatting for free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#features" className="btn-secondary px-6 py-3 w-full sm:w-auto flex items-center justify-center">
            View features
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
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
  <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-dark-600 transition-colors">
    <div className="w-10 h-10 bg-dark-900 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-primary-400" size={20} />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-dark-100">{title}</h3>
    <p className="text-sm text-dark-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
