import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Users,
  MessageCircleMore,
  CheckCircle2,
  Send,
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="landing-page min-h-screen text-slate-100 relative overflow-hidden">
      <div className="landing-bg-orb landing-bg-orb--one" />
      <div className="landing-bg-orb landing-bg-orb--two" />
      <div className="landing-bg-grid" />

      <header className="landing-header relative z-10">
        <nav className="mx-auto max-w-7xl px-5 md:px-8 py-4 md:py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/synctalk-logo.svg"
              alt="SyncTalk logo"
              className="h-9 w-9 rounded-full shadow-lg shadow-sky-500/30"
            />
            <div className="leading-tight">
              <p className="text-base md:text-lg font-bold tracking-tight text-white">SyncTalk</p>
              <p className="text-[11px] md:text-xs text-slate-300/80">Telegram-inspired team chat</p>
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

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="landing-chip mb-5">
                <Sparkles size={14} />
                <span>Telegram-style refresh with AI summaries</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Modern team messaging with
                <span className="landing-gradient-text"> Telegram-like clarity.</span>
              </h1>

              <p className="mt-5 md:mt-6 text-slate-300/90 text-base md:text-lg leading-relaxed max-w-xl">
                SyncTalk blends real-time channels, voice notes, and AI-generated summaries in a cleaner,
                calmer interface tuned for fast collaboration.
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
                  <CheckCircle2 size={16} className="text-sky-400" />
                  <span>Instant messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-400" />
                  <span>Clean channel-first layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-400" />
                  <span>AI summaries</span>
                </div>
              </div>
            </div>

            <div className="landing-preview-card">
              <div className="landing-preview-header">
                <div className="flex items-center gap-3">
                  <img src="/synctalk-logo.svg" alt="SyncTalk" className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-white"># product-launch</p>
                    <p className="text-xs text-slate-300/75">Telegram-style workspace</p>
                  </div>
                </div>
                <span className="landing-online-pill">Live</span>
              </div>

              <div className="landing-preview-body">
                <div className="landing-msg landing-msg--other">
                  <p className="landing-msg-user">Aman</p>
                  <p>Design refresh looks great. Can we ship today?</p>
                </div>
                <div className="landing-msg landing-msg--own">
                  <p>Yes ✅ desktop and mobile polish is done.</p>
                </div>
                <div className="landing-msg landing-msg--other">
                  <p className="landing-msg-user">Riya</p>
                  <p>Share a quick summary for stakeholders.</p>
                </div>
                <div className="landing-ai-summary">
                  <Sparkles size={14} />
                  <span>AI Summary: Telegram-inspired redesign is complete and ready to release.</span>
                </div>
              </div>

              <div className="landing-preview-input">
                <MessageCircleMore size={16} className="text-slate-300/75" />
                <span className="text-sm text-slate-300/70">Write a message...</span>
                <Send size={14} className="text-sky-300 ml-auto" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 md:px-8 pb-16 md:pb-24">
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            <FeatureCard
              icon={Zap}
              title="Real-time by default"
              desc="Socket-powered updates with smooth message flow and Telegram-like snappiness."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI quick summaries"
              desc="Instantly condense long threads into clear action points without losing context."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Secure collaboration"
              desc="Protected channels, safe uploads, and authentication built for team environments."
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5 md:gap-6">
            <MiniCard
              icon={Users}
              title="Built for teams"
              desc="Organized spaces, member presence, and focused conversations in one place."
            />
            <MiniCard
              icon={MessageCircleMore}
              title="Familiar and clean"
              desc="Balanced spacing, rounded surfaces, and Telegram-inspired tones for readability."
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
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
);

export default Landing;
