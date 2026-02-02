import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  MousePointer2, 
  ChevronRight,
  Zap, 
  Target, 
  Smile, 
  Bell, 
  Heart, 
  Menu, 
  X,
  Loader2,
  Mail,
  Users,
  ExternalLink
} from 'lucide-react';

// --- Configuration ---
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/qwnv5cx1cnycq99tc807eu13k6wz82bd';
const X_TWITTER_URL = 'https://x.com/endaloopapp?s=11'; 

// --- Types ---
type ViewState = 'home' | 'privacy' | 'terms' | 'contact';

// --- Accessibility Components ---
const SkipToContent: React.FC = () => (
  <a 
    href="#main-content" 
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-white focus:text-[#5B8DCD] focus:font-bold focus:rounded-xl focus:shadow-xl focus:ring-4 focus:ring-blue-100"
  >
    Skip to content
  </a>
);

// --- Global UI Components ---
const Logo: React.FC<{ className?: string; color?: string; strokeWidth?: number }> = ({ 
  className = "w-8 h-8", 
  color = "#5B8DCD",
  strokeWidth = 6
}) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="40" stroke={color} strokeWidth={strokeWidth} strokeDasharray="210 50" strokeLinecap="round" />
    <path d="M75 25L95 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);

const Navbar: React.FC<{ onViewChange: (view: ViewState) => void; currentView: ViewState }> = ({ onViewChange, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-slate-100/50" role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <button 
          onClick={() => { onViewChange('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 rounded-lg transition-all z-[60]"
        >
          <Logo className="w-7 h-7 md:w-8 h-8" />
          <span className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">EndALoop</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest text-slate-600 uppercase">
          <button onClick={(e) => handleNavClick(e, 'features')} className="hover:text-[#5B8DCD] transition-colors">FEATURES</button>
          <button onClick={(e) => handleNavClick(e, 'how')} className="hover:text-[#5B8DCD] transition-colors">HOW IT WORKS</button>
        </div>

        <div className="flex items-center gap-3 md:gap-4 z-[60]">
          <button 
            onClick={() => {
              if (currentView !== 'home') {
                onViewChange('home');
                setTimeout(() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }), 50);
              } else {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#1E293B] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-slate-200"
          >
            Early Access
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm md:hidden z-40"
            />
            <motion.div 
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden z-50 flex flex-col gap-4 shadow-xl"
            >
              <button onClick={(e) => handleNavClick(e, 'features')} className="text-left text-xs font-bold tracking-[0.2em] text-slate-800 p-4 rounded-2xl uppercase">FEATURES</button>
              <button onClick={(e) => handleNavClick(e, 'how')} className="text-left text-xs font-bold tracking-[0.2em] text-slate-800 p-4 rounded-2xl uppercase">HOW IT WORKS</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Page View Components ---

const PageLayout: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <section className="pt-32 md:pt-48 pb-16 md:pb-32 px-4 md:px-6 min-h-screen">
    <div className="max-w-3xl mx-auto">
      <div className="mb-12 md:mb-20 space-y-4 md:space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-[#0F172A] tracking-tighter leading-tight">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">{subtitle}</p>}
        <div className="w-12 h-1 bg-[#5B8DCD]/20 rounded-full mx-auto md:mx-0" />
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-8 md:space-y-12">
        {children}
      </div>
    </div>
  </section>
);

const PrivacyPage: React.FC = () => (
  <PageLayout 
    title="Privacy Policy" 
    subtitle="A calm, clear, and reassuring look at how we respect your attention and data."
  >
    <div className="space-y-8 md:space-y-14">
      <section>
        <p className="text-lg md:text-xl text-[#1E293B] font-medium leading-relaxed mb-6 md:mb-8">EndALoop is built for your mind, not for your data. We believe your digital behavior should be private and your attention should be yours to direct. We handle all information with the same care and respect we’d want for our own digital lives.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">What we collect</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">Currently, our collection is minimal and transparent. We collect your email address when you submit it through our website to join the waitlist. If you choose to fill out our optional questionnaires, we collect those responses to help us better understand the needs of our community.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">How we use your information</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">Your information is used solely to improve your experience with EndALoop. We use your email to send early access updates and beta invitations. Optional questionnaire data is used for product research, helping us refine our features to better support neurodivergent focus.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Our Commitment</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">We do not sell your personal data to third parties. We do not read your private content, messages, or posts. We do not track your browsing history or external digital behavior. Once the app is implemented, any usage data will be limited to time-based signals and will only be collected with your explicit, informed permission.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Where your data is stored</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">We work with trusted partners to manage our community safely. We use MailerLite for our email communications, Google Sheets for organizing our early access list, and Make.com to process our automation workflows securely.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Your choices</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">You have full control over your data. You can unsubscribe from our mailing list at any time by clicking the link in any email. You can also contact us directly to request the complete deletion of your information from our records.</p>
      </section>

      <section className="pt-8 md:pt-12 border-t border-slate-100 space-y-4 md:space-y-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-[#1E293B] mb-2 tracking-tight">Contact</h3>
          <p className="text-slate-600 text-sm md:text-base">If you have any questions about your privacy or how we handle your data, please reach out to us at <a href="mailto:hello@endaloop.com" className="text-[#5B8DCD] font-semibold hover:underline">hello@endaloop.com</a>.</p>
        </div>
        <p className="pt-2 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Effective Date: February 2, 2026</p>
      </section>
    </div>
  </PageLayout>
);

const TermsPage: React.FC = () => (
  <PageLayout 
    title="Terms of Use" 
    subtitle="Readable terms for our early access community."
  >
    <div className="space-y-8 md:space-y-14">
      <section>
        <p className="text-lg md:text-xl text-[#1E293B] font-medium leading-relaxed mb-6 md:mb-8">By joining our early access waitlist, you're becoming part of the EndALoop community. These terms outline how we work together during this stage of our journey.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Early Access & Beta</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">EndALoop is currently in early access. This means features may change frequently, be removed entirely, or be temporarily unavailable as we iterate based on your feedback. We appreciate your patience and contribution to building a better tool.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Not medical advice</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">EndALoop is intended for educational and habit-building purposes only. It is not medical, therapeutic, or psychiatric advice and is not a substitute for professional care. Always seek the advice of a qualified healthcare provider for any health concerns.</p>
      </section>

      <section className="space-y-3 md:space-y-4">
        <h3 className="text-lg md:text-xl font-bold text-[#1E293B] tracking-tight">Limitation of liability</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">EndALoop is provided “as is” and we cannot guarantee specific outcomes. We are not liable for any indirect losses or damages related to your use of the site or app. We believe in building a tool that helps, but use is at your own discretion.</p>
      </section>

      <section className="pt-8 md:pt-12 border-t border-slate-100">
        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Last Updated: February 2, 2026</p>
      </section>
    </div>
  </PageLayout>
);

const ContactPage: React.FC = () => (
  <PageLayout 
    title="Contact Us" 
    subtitle="We'd love to hear your thoughts, feedback, or collaboration ideas."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-4">
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all">
        <div className="w-12 h-12 md:w-16 h-16 bg-blue-50 text-[#5B8DCD] rounded-2xl flex items-center justify-center mb-6 md:mb-10">
          <Mail size={24} className="md:w-8 md:h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4">Support & Feedback</h3>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium mb-6 md:mb-8">For questions, early access support, and feedback.</p>
        <a href="mailto:hello@endaloop.com" className="text-base md:text-lg font-bold text-[#5B8DCD] hover:underline mt-auto">hello@endaloop.com</a>
      </div>
      
      <div className="p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all">
        <div className="w-12 h-12 md:w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 md:mb-10">
          <Users size={24} className="md:w-8 md:h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4">Partnerships</h3>
        <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium mb-6 md:mb-8">For collaborations, research, and brand opportunities.</p>
        <a href="mailto:partnerships@endaloop.com" className="text-base md:text-lg font-bold text-[#5B8DCD] hover:underline mt-auto">partnerships@endaloop.com</a>
      </div>
    </div>
  </PageLayout>
);

// --- Main App & Landing Page Sections ---

const WaitlistForm: React.FC<{ id?: string }> = ({ id = "waitlist-form" }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: id, timestamp: new Date().toISOString(), project: 'EndALoop' }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000); 
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 text-[#5B8DCD] font-semibold py-3 px-6 md:py-4 md:px-8 bg-blue-50/40 rounded-full border border-blue-100/50"
      >
        <CheckCircle2 size={20} className="md:w-6 md:h-6" aria-hidden="true" />
        <span className="text-base md:text-lg">You're on the list!</span>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[540px] lg:mx-0 mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 bg-white rounded-3xl sm:rounded-full shadow-[0_12px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100"
      >
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`} 
          type="email" 
          required 
          disabled={status === 'submitting'}
          placeholder="yourname@email.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-6 sm:pl-10 sm:pr-4 py-4 sm:py-3 bg-transparent text-[#2E3A4E] placeholder:text-slate-400 focus:outline-none font-normal text-sm md:text-[15px]"
        />
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="bg-[#1E293B] text-white px-6 py-4 sm:py-4 rounded-2xl sm:rounded-full font-bold text-sm md:text-[15px] hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap disabled:opacity-80 shadow-sm"
        >
          {status === 'submitting' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Get Early Access 
              <ArrowRight size={18} className="stroke-[2.5px] opacity-80" />
            </>
          )}
        </button>
      </form>
      {status === 'error' && <p className="text-xs text-red-500 font-bold mt-2 ml-4">Error. Please try again.</p>}
    </div>
  );
};

const AppMockup: React.FC<{ children: React.ReactNode; className?: string; label?: string }> = ({ children, className = "", label = "App screenshot" }) => (
  <figure className={`relative mx-auto rounded-[2.5rem] md:rounded-[3.8rem] p-3 md:p-4 bg-[#0F172A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] border border-slate-800 ${className}`}>
    <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden w-[260px] md:w-[290px] h-[540px] md:h-[600px] bg-white relative flex flex-col border border-slate-200 shadow-inner">
        <div className="absolute top-0 inset-x-0 h-6 md:h-8 flex justify-center pt-2 z-20"><div className="w-16 md:w-20 h-5 md:h-6 bg-black rounded-full" /></div>
        <div className="pt-10 md:pt-12 flex-1 overflow-hidden">{children}</div>
    </div>
  </figure>
);

const Hero: React.FC = () => (
  <section id="hero-section" className="relative pt-32 md:pt-48 lg:pt-64 pb-16 md:pb-32 px-4 md:px-6 min-h-screen flex items-center overflow-hidden scroll-mt-24">
    <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-blue-50/50 rounded-full blur-[100px] md:blur-[160px] -z-10" />
    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
      <div className="flex-1 space-y-8 md:space-y-12 text-center lg:text-left z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 md:mb-10">
            <span className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-white border border-slate-100 text-[10px] md:text-[11px] font-bold tracking-[0.2em] md:tracking-[0.25em] text-[#5B8DCD] uppercase shadow-sm">BETA ACCESS RELEASING SOON</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#0F172A] leading-[1.05] lg:leading-[0.95] mb-6 md:mb-8 tracking-tighter">
            End A Loop.<br />
            <span className="text-slate-400 font-light italic block mt-1 md:mt-2 md:ml-8">Start living.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-slate-500 max-w-lg lg:mx-0 mx-auto leading-relaxed font-medium">
            Break out of scrolling loops without harsh blocks. EndALoop uses gentle nudges to guide you back to focus, shame-free.
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center lg:items-start gap-8 md:gap-12">
          <WaitlistForm id="hero" />
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3">
             <div className="flex items-center gap-2 md:gap-2.5 bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-slate-100 shadow-sm">
               <div className="text-[#2E3A4E] flex-shrink-0">
                 <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M17.05,20.28c-0.98,0.95-2.05,0.8-3.08,0.35c-1.09-0.46-2.09-0.48-3.24,0c-1.44,0.62-2.2,0.44-3.06-0.35 C2.79,15.25,3.51,7.59,9.05,7.31c1.35,0.07,2.29,0.74,3.06,0.75c1.21-0.02,2.1-0.81,3.46-0.74c1.5,0.07,2.76,0.6,3.52,1.74 c-3.13,1.88-2.58,6.04,0.53,7.31C18.96,18.01,18.1,19.63,17.05,20.28z M12.03,7.25c-0.02-3.87,3.22-7.03,7.03-7.1 c0,0,0.15,3.86-3.14,7.02C14.61,8.45,13.31,8.57,12.03,7.25z"/>
                 </svg>
               </div>
               <span className="text-[11px] md:text-[13px] font-bold text-[#2E3A4E] whitespace-nowrap">iOS</span>
             </div>
             <div className="flex items-center gap-2 md:gap-2.5 bg-white px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-slate-100 shadow-sm">
                <div className="text-[#2E3A4E] flex-shrink-0">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.2 60.1 60.1L104.6 499z"/>
                  </svg>
                </div>
               <span className="text-[11px] md:text-[13px] font-bold text-[#2E3A4E] whitespace-nowrap">Android</span>
             </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative flex justify-center lg:justify-end">
        <div className="relative group">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 md:-right-16 top-10 md:top-14 p-4 md:p-5 bg-white rounded-3xl md:rounded-[2.2rem] shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1)] z-20 w-[200px] md:w-[270px] flex flex-col gap-2 md:gap-3 border border-slate-50"
          >
            <div className="flex items-start gap-2.5 md:gap-3.5">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F1F6FF] text-[#5B8DCD] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm md:text-base font-bold text-[#1E293B] tracking-tight leading-tight">New Nudge</p>
                    <p className="text-[10px] md:text-xs text-slate-400 font-medium mt-0.5">2 mins ago</p>
                </div>
            </div>
            <p className="text-[0.8rem] md:text-[0.9rem] text-slate-600 font-medium leading-snug px-0.5">Time for a quick intentional switch?</p>
          </motion.div>

          <AppMockup label="EndALoop app interface">
            <div className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center bg-white">
              <Logo className="w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-10" strokeWidth={6} />
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4">Looping?</h3>
              <p className="text-slate-500 text-xs md:text-sm mb-8 md:mb-10 leading-relaxed px-2 md:px-4 font-medium">
                We noticed you've been scrolling for 15 minutes. Want to switch?
              </p>
              <div className="w-full space-y-2 md:space-y-3">
                <button className="w-full py-3 md:py-4 bg-[#5B8DCD] text-white rounded-full font-bold shadow-lg shadow-blue-100 text-xs md:text-sm">Yes, help me switch</button>
                <button className="w-full py-3 md:py-4 bg-white border border-slate-100 text-slate-400 rounded-full font-bold text-xs md:text-sm">No, I'm intentional</button>
              </div>
            </div>
          </AppMockup>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCards: React.FC = () => (
  <section id="features" className="py-20 md:py-32 lg:py-40 px-4 md:px-6 bg-[#FAFBFF] scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] tracking-tight">Better tools for your mind</h2>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Designed by neurodivergent minds to respect your autonomy and your focus.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {[
          { title: 'Gentle Nudges', desc: 'Non-aggressive reminders that appear when you might be mindlessly scrolling.', icon: <Zap className="text-blue-500" />, color: "bg-blue-50" },
          { title: 'Full Control', desc: 'No force. You decide if you stay or switch. No punishment, just options.', icon: <MousePointer2 className="text-purple-500" />, color: "bg-purple-50" },
          { title: 'Tiny Redirects', desc: '2-minute actions like sketching or stretching to reset your brain.', icon: <Target className="text-orange-500" />, color: "bg-orange-50" },
          { title: 'Mindful Progress', desc: 'Measure success by loops ended, not streaks maintained.', icon: <Smile className="text-green-500" />, color: "bg-green-50" },
        ].map((feature, idx) => (
          <motion.article key={idx} className="p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all">
            <div className={`w-14 h-14 md:w-16 md:h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 md:mb-10`}>
              {React.cloneElement(feature.icon as React.ReactElement, { size: 24, className: (feature.icon as React.ReactElement).props.className + " md:w-8 md:h-8" })}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3 md:mb-4">{feature.title}</h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">{feature.desc}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const SectionedInfo: React.FC = () => (
  <section id="how" className="py-20 md:py-32 lg:py-48 px-4 md:px-6 overflow-hidden scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-28">
        <div className="flex-1 space-y-10 md:space-y-14">
          <div className="space-y-4 md:space-y-8 text-center lg:text-left">
            <span className="text-[#5B8DCD] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] block">THE PROCESS</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-[#0F172A] leading-[1.1] lg:leading-[0.95] tracking-tight">Break cycles,<br />not spirits.</h2>
            <p className="text-lg md:text-2xl text-slate-500 leading-relaxed font-medium">Traditional blockers feel like prison. EndALoop feels like a supportive friend who helps you remember what you actually wanted to do.</p>
          </div>
          <ol className="space-y-8 md:space-y-14 max-w-xl mx-auto lg:mx-0">
            {[
              { num: 1, title: 'Detection', desc: 'We silently note when content consumption looks like a loop.', color: 'text-[#5B8DCD]' },
              { num: 2, title: 'The Nudge', desc: 'A gentle prompt helps you pause and notice your current state.', color: 'text-purple-500' },
              { num: 3, title: 'Redirection', desc: 'Choose a 2-minute activity to bridge the gap back to intention.', color: 'text-orange-500' },
            ].map((step, i) => (
              <li key={i} className="flex gap-6 md:gap-10 group items-start">
                <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-xl ${step.color} flex items-center justify-center font-bold text-lg md:text-xl border border-slate-50`}>{step.num}</div>
                <div className="pt-1 md:pt-2">
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">{step.title}</h4>
                  <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-1 relative flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-50/40 rounded-full blur-[100px] md:blur-[160px] -z-10" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-white p-6 md:p-10 rounded-[3rem] md:rounded-[4.5rem] shadow-2xl border border-slate-100 relative">
             <AppMockup label="Redirection options">
                  <div className="p-6 md:p-8 h-full flex flex-col bg-white">
                      <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12"><ChevronRight size={22} className="text-slate-300 rotate-180" /><span className="font-bold text-[#0F172A] text-lg md:text-xl">Quick Switch</span></div>
                      <div className="grid grid-cols-2 gap-4 md:gap-5 flex-1">
                          {[
                              { name: 'Doodle', icon: <Smile size={24} />, color: 'text-blue-500' },
                              { name: 'Stretch', icon: <Zap size={24} />, color: 'text-orange-500' },
                              { name: 'Breath', icon: <Heart size={24} />, color: 'text-red-500' },
                              { name: 'Hydrate', icon: <Target size={24} />, color: 'text-green-500' },
                          ].map((move, i) => (
                              <div key={i} className="aspect-square bg-[#F8FAFF] rounded-[1.8rem] md:rounded-[2.2rem] p-4 flex flex-col items-center justify-center text-center group hover:bg-slate-900 transition-all duration-400 cursor-pointer">
                                  <div className={`mb-2 md:mb-4 ${move.color} group-hover:text-white transition-colors`}>{move.icon}</div>
                                  <p className="text-slate-800 text-xs md:text-sm font-bold group-hover:text-white transition-colors">{move.name}</p>
                              </div>
                          ))}
                      </div>
                      <div className="mt-8 md:mt-12"><p className="text-[10px] md:text-xs text-slate-400 font-bold text-center mb-4 md:mb-6">Just 2 minutes. No strings attached.</p><button className="w-full py-4 md:py-6 bg-slate-900 text-white rounded-[1.5rem] md:rounded-[1.8rem] font-bold text-center text-sm md:text-base hover:bg-black transition-colors">Start Switch</button></div>
                  </div>
             </AppMockup>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC<{ onViewChange: (view: ViewState) => void }> = ({ onViewChange }) => {
  const handleLink = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 md:py-32 px-4 md:px-6 bg-[#FAFBFF] border-t border-slate-100" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
        <div className="flex flex-col items-center md:items-start gap-6 md:gap-8">
            <button onClick={() => { onViewChange('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5">
              <Logo className="w-7 h-7 md:w-8 h-8" />
              <span className="text-xl md:text-2xl font-bold text-[#1E293B]">EndALoop</span>
            </button>
            <p className="text-slate-500 text-base md:text-lg max-w-xs md:max-w-md text-center md:text-left font-medium">Mindful technology designed for ADHD and neurodivergent minds.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-14 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] md:tracking-[0.25em]">
          <button onClick={(e) => handleLink(e, 'privacy')} className="hover:text-[#5B8DCD] transition-colors focus:outline-none focus:underline">PRIVACY</button>
          <button onClick={(e) => handleLink(e, 'terms')} className="hover:text-[#5B8DCD] transition-colors focus:outline-none focus:underline">TERMS</button>
          <button onClick={(e) => handleLink(e, 'contact')} className="hover:text-[#5B8DCD] transition-colors focus:outline-none focus:underline">CONTACT</button>
          <a href={X_TWITTER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#5B8DCD] transition-colors flex items-center gap-1">
            X <ExternalLink size={10} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 md:mt-32 pt-8 md:pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <p className="text-[9px] md:text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase text-center md:text-left">&copy; {new Date().getFullYear()} EndALoop Labs. Built for intention.</p>
        <div className="flex items-center gap-2 text-slate-400">
           <Heart size={14} className="md:w-4 md:h-4" aria-hidden="true" /> <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">NEURODIVERGENT OWNED</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App & Routing ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch(currentView) {
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'contact': return <ContactPage />;
      default: return (
        <>
          <Hero />
          <FeatureCards />
          <SectionedInfo />
          <section id="waitlist" className="py-32 md:py-48 lg:py-56 px-4 md:px-6 relative scroll-mt-24">
            <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-20">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6 md:space-y-10">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-semibold text-[#0F172A] tracking-tighter leading-[1.1] lg:leading-[0.9]">The loop ends <br /><span className="text-slate-400 font-light italic">with you.</span></h2>
                <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Be the first to experience a kinder way to handle your attention. Early access is limited.</p>
              </motion.div>
              <div className="flex justify-center"><WaitlistForm id="footer-cta" /></div>
            </div>
          </section>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E293B] font-inter selection:bg-blue-50 selection:text-blue-600">
      <SkipToContent />
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main id="main-content" className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onViewChange={setCurrentView} />
    </div>
  );
};

export default App;