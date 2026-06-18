import { Link } from 'react-router-dom';
<<<<<<< HEAD
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Users,
  MessageCircleMore,
  CheckCircle2,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page min-h-screen text-slate-100 relative overflow-hidden">
      {/* Background effects */}
      <div className="landing-bg-orb landing-bg-orb--one" />
      <div className="landing-bg-orb landing-bg-orb--two" />
      <div className="landing-bg-grid" />

      {/* Header */}
      <header className="landing-header relative z-10">
        <nav className="mx-auto max-w-7xl px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/synctalk-logo.svg"
              alt="SyncTalk logo"
              className="h-9 w-9 rounded-xl shadow-lg shadow-sky-500/20"
            />
            <div className="leading-tight">
              <p className="text-base md:text-lg font-bold tracking-tight text-white">SyncTalk</p>
              <p className="text-[11px] md:text-xs text-slate-300/80">Real-time team messaging</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login" className="landing-btn-ghost">
              Log in
            </Link>
            <Link to="/register" className="landing-btn-primary">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="landing-chip mb-5">
                <Sparkles size={14} />
                <span>Telegram-style redesign + AI summaries</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Team chat that feels
                <span className="landing-gradient-text"> fast, clean, and modern.</span>
              </h1>

              <p className="mt-5 md:mt-6 text-slate-300/90 text-base md:text-lg leading-relaxed max-w-xl">
                SyncTalk brings real-time collaboration, voice notes, and quick AI-powered
                summaries in a distraction-free interface inspired by Telegram.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/register" className="landing-btn-primary landing-btn-lg">
                  Start chatting free
                  <ArrowRight size={18} />
                </Link>
                <a href="#features" className="landing-btn-secondary landing-btn-lg">
                  Explore features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Instant messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Secure authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>AI summaries</span>
                </div>
              </div>
            </div>

            {/* Hero preview card */}
            <div className="landing-preview-card">
              <div className="landing-preview-header">
                <div className="flex items-center gap-3">
                  <img
                    src="/synctalk-logo.svg"
                    alt="SyncTalk"
                    className="h-8 w-8 rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white"># engineering-team</p>
                    <p className="text-xs text-slate-300/75">23 members • 7 online</p>
                  </div>
                </div>
                <span className="landing-online-pill">Live</span>
              </div>

              <div className="landing-preview-body">
                <div className="landing-msg landing-msg--other">
                  <p className="landing-msg-user">Aman</p>
                  <p>Deployed the new auth patch. Can someone verify onboarding flow?</p>
                </div>
                <div className="landing-msg landing-msg--own">
                  <p>Tested ✅ Login + register both working now.</p>
                </div>
                <div className="landing-msg landing-msg--other">
                  <p className="landing-msg-user">Riya</p>
                  <p>Great. Summarize this thread for release notes?</p>
                </div>
                <div className="landing-ai-summary">
                  <Sparkles size={14} />
                  <span>AI Summary: Auth patch deployed and validated. Ready for release.</span>
                </div>
              </div>

              <div className="landing-preview-input">
                <MessageCircleMore size={16} className="text-slate-300/75" />
                <span className="text-sm text-slate-300/70">Write a message...</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-5 md:px-8 pb-16 md:pb-24">
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            <FeatureCard
              icon={Zap}
              title="Real-time by default"
              desc="Socket-powered messaging with fast delivery and smooth conversation flow."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI quick summaries"
              desc="Turn long threads into concise action points in one click."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Secure collaboration"
              desc="JWT auth, protected rooms, and safe media handling for your team."
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5 md:gap-6">
            <MiniCard
              icon={Users}
              title="Built for teams"
              desc="Group channels, member controls, and presence indicators keep everyone aligned."
            />
            <MiniCard
              icon={MessageCircleMore}
              title="Distraction-free interface"
              desc="A Telegram-inspired layout focused on readability, speed, and clarity."
            />
          </div>
        </section>
      </main>
=======
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
>>>>>>> friend/main
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
<<<<<<< HEAD
  <article className="landing-feature-card">
    <div className="landing-feature-icon">
      <Icon size={20} />
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </article>
);

const MiniCard = ({ icon: Icon, title, desc }) => (
  <article className="landing-mini-card">
    <div className="landing-mini-icon">
      <Icon size={18} />
    </div>
    <div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </article>
=======
  <div className="glass p-8 rounded-3xl border border-dark-700/50 hover:bg-dark-800/80 transition-colors group">
    <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-primary-400" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-dark-100">{title}</h3>
    <p className="text-dark-400 leading-relaxed">{desc}</p>
  </div>
>>>>>>> friend/main
);

export default Landing;
