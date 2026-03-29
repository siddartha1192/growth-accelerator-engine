import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Zap, TrendingUp, Users, Phone, Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholders = [
  "Describe your biggest business challenge…",
  "What's holding back your revenue growth?",
  "Tell us about your business and goals…",
  "We're losing leads but can't figure out why…",
];

const chips = [
  'More qualified leads',
  'Reduce operational costs',
  'Better business insights',
  'Scale past ₹25Cr',
  'AI automation strategy',
  'Fix revenue leakage',
  'Build a growth system',
  'Improve team efficiency',
];

const stats = [
  { icon: TrendingUp, value: '2–3×', label: 'Revenue Growth' },
  { icon: Users,      value: '200+', label: 'Businesses Scaled' },
  { icon: Zap,        value: '70%',  label: 'Cost Reduction' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Gradient headline with draw-in underline ────────────── */
function GradientLine({ text, delay }: { text: string; delay: number }) {
  const words = text.split(' ');
  return (
    <span className="block relative">
      {words.map((word, i) => (
        <motion.span key={i}
          initial={{ opacity: 0, y: 48, filter: 'blur(12px)', scale: 0.88 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ delay: delay + i * 0.055, duration: 0.6, ease: EASE }}
          className="inline-block mr-[0.26em]"
          style={{
            background: 'linear-gradient(100deg, hsl(230 95% 72%) 0%, hsl(185 100% 58%) 50%, hsl(270 85% 72%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          {word}
        </motion.span>
      ))}
      <motion.span
        className="absolute left-0 bottom-[-4px] h-[3px] rounded-full pointer-events-none"
        initial={{ width: '0%', opacity: 0 }}
        animate={{ width: '78%', opacity: 1 }}
        transition={{ delay: delay + words.length * 0.055 + 0.1, duration: 0.7, ease: EASE }}
        style={{ background: 'linear-gradient(90deg, hsl(230 95% 65%), hsl(185 100% 55%), transparent)' }}
      />
    </span>
  );
}

const stepConfig = [
  {
    icon: MessageSquare,
    label: 'Your pain point',
    placeholder: "What's your biggest business challenge?",
    type: 'text',
    hint: 'Be specific — the more detail, the better your diagnosis.',
  },
  {
    icon: Phone,
    label: 'Phone number',
    placeholder: '+91 98765 43210',
    type: 'tel',
    hint: "We'll only call if you want a follow-up session.",
  },
  {
    icon: Mail,
    label: 'Email address',
    placeholder: 'you@company.com',
    type: 'email',
    hint: 'Your personalised diagnosis will be sent here.',
  },
];

/* ── Multi-step Search Block ─────────────────────────────── */
const SearchBlock = memo(function SearchBlock({ mobile = false, placeholderIdx }: {
  mobile?: boolean;
  placeholderIdx: number;
}) {
  const [step, setStep] = useState(0); // 0, 1, 2
  const [values, setValues] = useState(['', '', '']);
  const [hovered, setHovered] = useState(false);
  const [error, setError]   = useState('');
  const navigate = useNavigate();

  const current = stepConfig[step];
  const value   = values[step];

  const updateValue = (v: string) => {
    setError('');
    setValues(prev => { const n = [...prev]; n[step] = v; return n; });
  };

  const handleChip = (chip: string) => {
    setValues(prev => { const n = [...prev]; n[0] = chip; return n; });
  };

  const validate = () => {
    if (!value.trim()) { setError('Please fill this in to continue.'); return false; }
    if (step === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError('Enter a valid email address.'); return false;
      }
    }
    if (step === 1) {
      if (!/[\d+\-\s()]{7,}/.test(value)) {
        setError('Enter a valid phone number.'); return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 2) {
      setStep(s => s + 1);
    } else {
      navigate('/thank-you', { state: { painPoint: values[0], phone: values[1], email: values[2] } });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <div className={mobile ? 'w-full' : 'flex flex-col gap-5 w-full max-w-[560px]'}>

      {/* AI badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: mobile ? 0.05 : 0.12, duration: 0.45, ease: EASE }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${mobile ? 'self-center mb-3' : 'self-start'}`}
        style={{ background: 'hsl(0 0% 0% / 0.55)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: '#fff' }}
          animate={{ boxShadow: ['0 0 4px rgba(255,255,255,0.4)', '0 0 10px rgba(255,255,255,1)', '0 0 4px rgba(255,255,255,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white">AI Growth Diagnosis</span>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: mobile ? 0.08 : 0.15, duration: 0.35 }}
        className={`flex items-center gap-3 ${mobile ? 'justify-center' : ''}`}
      >
        {stepConfig.map((_s, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: '8px',
              height: '8px',
              background: i < step
                ? 'hsl(185 100% 55%)'
                : i === step
                  ? 'hsl(230 95% 65%)'
                  : 'hsl(216 30% 22%)',
              boxShadow: i === step ? '0 0 8px hsl(230 95% 65% / 0.7)' : 'none',
            }}
          />
        ))}
        <span className="text-[10px] font-mono ml-1" style={{ color: 'hsl(218 18% 45%)' }}>
          {step + 1} / 3
        </span>
      </motion.div>

      {/* Input pill */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: mobile ? 0.1 : 0.18, duration: 0.55, ease: EASE }}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-[2rem] blur-md pointer-events-none transition-opacity duration-300"
          style={{ background: 'hsl(230 95% 65% / 0.22)', opacity: hovered ? 1 : 0 }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative flex items-center gap-3 px-6 py-4 rounded-full transition-colors duration-200"
            style={{
              background: 'hsl(220 30% 9% / 0.82)',
              border: `1px solid ${hovered ? 'hsl(230 95% 65% / 0.5)' : 'hsl(216 30% 22%)'}`,
              backdropFilter: 'blur(20px)',
              boxShadow: 'inset 0 1px 0 hsl(220 30% 26% / 0.5)',
            }}
          >
            {/* Step icon */}
            <current.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(230 95% 65%)' }} />

            <div className="relative flex-1 min-w-0 h-6 flex items-center">
              <input
                key={`input-${step}`}
                autoFocus
                type={current.type}
                value={value}
                onChange={e => updateValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full bg-transparent text-base focus:outline-none z-10"
                style={{ color: 'hsl(224 100% 97%)' }}
              />
              {!value && (
                <span
                  className="absolute inset-0 flex items-center pointer-events-none select-none text-base truncate"
                  style={{ color: 'hsl(218 18% 42%)' }}
                >
                  {step === 0 ? placeholders[placeholderIdx] : current.placeholder}
                </span>
              )}
            </div>

            <button
              onClick={handleNext}
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, hsl(230 95% 65%), hsl(185 100% 55%))' }}
            >
              {step < 2
                ? <ChevronRight className="w-4 h-4 text-white" />
                : <ArrowRight className="w-3.5 h-3.5 text-white" />
              }
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] mt-2 px-2 font-mono"
              style={{ color: 'hsl(0 80% 65%)' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Hint */}
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] mt-2 px-2 font-mono"
            style={{ color: 'hsl(218 18% 38%)' }}
          >
            {current.hint}
          </motion.p>
        </AnimatePresence>

        {/* Chips — only on step 0 */}
        {step === 0 && (
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -6, pointerEvents: 'none' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex flex-wrap gap-2 pt-3"
          >
            {chips.map(chip => (
              <button key={chip} onClick={() => handleChip(chip)}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] transition-all duration-150 hover:scale-[1.03]"
                style={{ background: 'hsl(220 30% 10% / 0.7)', border: '1px solid hsl(216 30% 20%)', color: 'hsl(218 18% 65%)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'hsl(230 95% 65% / 0.4)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'hsl(216 30% 20%)'; (e.currentTarget as HTMLElement).style.color = 'hsl(218 18% 65%)'; }}
              >
                {chip}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`label-${step}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="text-[11px] font-mono tracking-wide text-center"
          style={{ color: 'hsl(218 18% 40%)' }}
        >
          {step === 0 && 'Step 1 — Tell us your challenge'}
          {step === 1 && 'Step 2 — How can we reach you?'}
          {step === 2 && 'Step 3 — Where to send your diagnosis?'}
        </motion.p>
      </AnimatePresence>
    </div>
  );
});

/* ── Main component ──────────────────────────────────────── */
export default function HeroSection() {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  useEffect(() => {
    const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % placeholders.length), 3500);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    motionX.set((e.clientX / width - 0.5) * -18);
    motionY.set((e.clientY / height - 0.5) * -12);
  }, [motionX, motionY]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smooth    = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });
  const contentY  = useTransform(smooth, [0, 1], ['0%', '-18%']);
  const contentOp = useTransform(smooth, [0, 0.55], [1, 0]);
  const bgY       = useTransform(smooth, [0, 1], ['0%', '22%']);

  return (
    <section id="hero" ref={heroRef} onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ backgroundColor: '#04091c' }}>

      {/* ══ Background ══ */}
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-[-40px]" style={{ y: bgY, x: motionX, top: motionY }}>
          <img src="/pics/tech1.jpg" alt="" className="w-full h-full object-cover object-center" draggable={false} />
        </motion.div>
        <div className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to bottom, rgba(4,9,28,0.92) 0%, rgba(4,9,28,0.72) 55%, rgba(4,9,28,0.88) 100%)' }} />
        <div className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, rgba(4,9,28,0.97) 0%, rgba(4,9,28,0.82) 32%, rgba(4,9,28,0.45) 58%, rgba(4,9,28,0.10) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '180px' }} />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[hsl(222_50%_6%)] to-transparent" />
      </div>

      {/* ══ Content ══ */}
      <motion.div style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10">

        {/* ── MOBILE ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col items-center text-center gap-6 lg:hidden py-12"
        >
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-3xl leading-[1.0] tracking-tight text-white">
              <motion.span className="block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.5, ease: EASE }}>Tell Us About</motion.span>
              <motion.span className="block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14, duration: 0.5, ease: EASE }}>Your Business.</motion.span>
            </h1>
            <h1 className="font-display font-extrabold text-3xl leading-[1.0] tracking-tight">
              <motion.span className="block text-white" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.23, duration: 0.5, ease: EASE }}>We'll Show You</motion.span>
              <GradientLine delay={0.32} text="How to 2–3× It." />
            </h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.45, ease: EASE }}
            className="text-sm leading-relaxed max-w-[360px]" style={{ color: 'hsl(218 18% 65%)' }}>
            Personalised AI growth diagnosis — understand your revenue leakage and the exact systems needed to scale.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.4, ease: EASE }} className="flex items-center gap-3">
            <a href="#diagnosis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, hsl(230 95% 62%), hsl(220 100% 56%))', boxShadow: '0 4px 18px hsl(230 95% 65% / 0.32)' }}>
              Full Diagnosis <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
              <Play className="w-3.5 h-3.5" /> Watch Demo
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.48, duration: 0.4 }} className="w-full">
            <SearchBlock mobile placeholderIdx={placeholderIdx} />
          </motion.div>

          <div className="grid grid-cols-3 gap-4 w-full pt-2">
            {stats.map(({ value, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 + i * 0.06, duration: 0.4, ease: EASE }}
                className="flex flex-col items-center gap-1">
                <div className="font-display font-bold text-xl text-white">{value}</div>
                <div className="text-[10px] font-mono tracking-wide text-center" style={{ color: 'hsl(218 18% 48%)' }}>{label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="flex flex-wrap justify-center gap-3 text-[10px] font-mono" style={{ color: 'hsl(218 18% 40%)' }}>
            {['✓ No spam', '✓ 2-min diagnosis', '✓ Free to start'].map(t => <span key={t}>{t}</span>)}
          </motion.div>
        </motion.div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:grid grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center min-h-[calc(100vh-64px)] py-16">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="space-y-7"
          >
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.0] tracking-tight text-white">
                <motion.span className="block"
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.55, ease: EASE }}>
                  Tell Us About
                </motion.span>
                <motion.span className="block"
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.55, ease: EASE }}>
                  Your Business.
                </motion.span>
              </h1>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.0] tracking-tight">
                <motion.span className="block text-white"
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.55, ease: EASE }}>
                  We'll Show You
                </motion.span>
                <GradientLine delay={0.35} text="How to 2–3× It." />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: EASE }}
              className="text-base md:text-lg leading-relaxed max-w-[520px]" style={{ color: 'hsl(218 18% 68%)' }}>
              Get a personalised AI growth diagnosis — powered by TekKeys consulting intelligence. Understand your revenue leakage, growth gaps, and the exact systems needed to scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.50, duration: 0.45, ease: EASE }}
              className="flex items-center gap-3">
              <a href="#diagnosis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, hsl(230 95% 62%), hsl(220 100% 56%))', boxShadow: '0 4px 24px hsl(230 95% 65% / 0.38)' }}>
                Full Diagnosis <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff' }}>
                <Play className="w-3.5 h-3.5" /> Watch Demo
              </button>
            </motion.div>

            <div className="flex items-center gap-8">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.45, ease: EASE }}
                  className="flex items-center gap-2.5">
                  <motion.div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(230 95% 65% / 0.15)', border: '1px solid hsl(230 95% 65% / 0.25)' }}
                    whileHover={{ scale: 1.15, rotate: 5 }}>
                    <Icon className="w-4 h-4" style={{ color: 'hsl(230 95% 70%)' }} />
                  </motion.div>
                  <div>
                    <div className="font-display font-bold text-lg leading-none text-white">{value}</div>
                    <div className="text-[10px] font-mono tracking-wide mt-0.5" style={{ color: 'hsl(218 18% 50%)' }}>{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.72, duration: 0.4, ease: EASE }}
              className="flex flex-wrap gap-4 text-[11px] font-mono tracking-wide" style={{ color: 'hsl(218 18% 42%)' }}>
              {['✓ No spam', '✓ 2-minute diagnosis', '✓ Personalised results', '✓ Free to start'].map(t => <span key={t}>{t}</span>)}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:pt-8"
          >
            <SearchBlock placeholderIdx={placeholderIdx} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.6 }}
        style={{ opacity: contentOp }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'hsl(218 18% 38%)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8" style={{ background: 'linear-gradient(to bottom, hsl(230 95% 65% / 0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}
