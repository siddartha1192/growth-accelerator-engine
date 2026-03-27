import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Zap, TrendingUp, Users } from 'lucide-react';

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

function AnimatedWords({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [inputValue, setInputValue]         = useState('');
  const [mousePos, setMousePos]             = useState({ x: 0.5, y: 0.5 });

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(() => setPlaceholderIdx((i) => (i + 1) % placeholders.length), 3500);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { width, height } = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX / width, y: e.clientY / height });
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smooth     = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });
  const contentY   = useTransform(smooth, [0, 1], ['0%', '-18%']);
  const contentOp  = useTransform(smooth, [0, 0.55], [1, 0]);
  const bgY        = useTransform(smooth, [0, 1], ['0%', '22%']);

  const photoX = `${(mousePos.x - 0.5) * -18}px`;
  const photoY = `${(mousePos.y - 0.5) * -12}px`;

  const [searchHovered, setSearchHovered] = useState(false);

  /* ── Shared search block (used in both mobile + desktop) ── */
  const SearchBlock = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? 'w-full' : 'flex flex-col gap-5 w-full max-w-[560px]'}>

      {/* AI badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${mobile ? 'self-center mb-3' : 'self-start'}`}
        style={{
          background: 'hsl(0 0% 0% / 0.55)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#fff', boxShadow: '0 0 6px rgba(255,255,255,0.8)' }} />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: '#ffffff' }}>AI Growth Diagnosis</span>
      </div>

      {/* Search pill */}
      <div className="relative">
        {/* Glow */}
        <div
          className="absolute -inset-1 rounded-[2rem] transition-opacity duration-300 blur-md pointer-events-none"
          style={{ background: 'hsl(230 95% 65% / 0.22)', opacity: searchHovered ? 1 : 0 }}
        />
        <div
          className="relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-200"
          style={{
            background: 'hsl(220 30% 9% / 0.82)',
            border: `1px solid ${searchHovered ? 'hsl(230 95% 65% / 0.5)' : 'hsl(216 30% 22%)'}`,
            backdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 1px 0 hsl(220 30% 26% / 0.5)',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholders[placeholderIdx]}
            className="flex-1 bg-transparent text-base focus:outline-none min-w-0"
            style={{ color: 'hsl(224 100% 97%)' }}
          />
          <button
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, hsl(230 95% 65%), hsl(185 100% 55%))' }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Chips — desktop hover only */}
        <motion.div
          initial={false}
          animate={searchHovered ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -6, pointerEvents: 'none' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="hidden lg:flex flex-wrap gap-2 pt-3"
        >
          {chips.map((chip) => (
            <button
              key={chip}
              onClick={() => setInputValue(chip)}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] transition-all duration-150 hover:scale-[1.03]"
              style={{
                background: 'hsl(220 30% 10% / 0.7)',
                border: '1px solid hsl(216 30% 20%)',
                color: 'hsl(218 18% 65%)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(230 95% 65% / 0.4)';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(216 30% 20%)';
                (e.currentTarget as HTMLElement).style.color = 'hsl(218 18% 65%)';
              }}
            >
              {chip}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* ══ Background ══ */}
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-[-40px]" style={{ y: bgY, x: photoX, top: photoY }}>
          <img src="/pics/tech1.jpg" alt="" className="w-full h-full object-cover object-center" draggable={false} />
        </motion.div>

        {/* Mobile: full dark overlay */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to bottom, #000000ee 0%, #000000bb 60%, #000000dd 100%)' }}
        />

        {/* Desktop: left→right fade */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, #000000 0%, #000000cc 35%, #00000088 55%, transparent 100%)' }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px',
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[hsl(222_50%_6%)] to-transparent" />
      </div>

      {/* ══ Content ══ */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-5"
      >

        {/* ── MOBILE layout (< lg) ── */}
        <div className="flex flex-col items-center text-center gap-6 lg:hidden py-8">

          {/* Search at very top on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full"
          >
            <SearchBlock mobile />
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[10px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Headline centered */}
          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl leading-[1.0] tracking-tight text-white">
              <AnimatedWords text="Tell Us About" delay={0.3} className="block" />
              <AnimatedWords text="Your Business." delay={0.5} className="block" />
            </h1>
            <h1 className="font-display font-extrabold text-4xl leading-[1.0] tracking-tight">
              <AnimatedWords text="We'll Show You" delay={0.7} className="block" />
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.6 }}
                style={{
                  background: 'linear-gradient(100deg, hsl(230 95% 70%), hsl(185 100% 55%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                How to 2–3× It.
              </motion.span>
            </h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-base leading-relaxed max-w-[360px]"
            style={{ color: 'hsl(218 18% 65%)' }}
          >
            Personalised AI growth diagnosis — understand your revenue leakage and the exact systems needed to scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-3"
          >
            <a
              href="#diagnosis"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, hsl(230 95% 62%), hsl(220 100% 56%))', boxShadow: '0 4px 18px hsl(230 95% 65% / 0.32)' }}
            >
              Full Diagnosis <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}
            >
              <Play className="w-3.5 h-3.5" /> Watch Demo
            </button>
          </motion.div>

          {/* Stats row — 3 across */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35 }}
            className="grid grid-cols-3 gap-4 w-full pt-2"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="font-display font-bold text-xl text-white">{value}</div>
                <div className="text-[10px] font-mono tracking-wide text-center" style={{ color: 'hsl(218 18% 48%)' }}>{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-3 text-[10px] font-mono"
            style={{ color: 'hsl(218 18% 40%)' }}
          >
            {['✓ No spam', '✓ 2-min diagnosis', '✓ Free to start'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>

        {/* ── DESKTOP layout (lg+) ── */}
        <div className="hidden lg:grid grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center min-h-[calc(100vh-64px)] py-16">

          {/* LEFT: Headline */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-white">
                <AnimatedWords text="Tell Us About" delay={0.25} className="block" />
                <AnimatedWords text="Your Business." delay={0.45} className="block" />
              </h1>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight">
                <AnimatedWords text="We'll Show You" delay={0.65} className="block" />
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.92, duration: 0.6 }}
                  style={{
                    background: 'linear-gradient(100deg, hsl(230 95% 70%) 0%, hsl(185 100% 55%) 60%, hsl(270 85% 70%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  How to 2–3× It.
                </motion.span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-lg md:text-xl leading-relaxed max-w-[520px]"
              style={{ color: 'hsl(218 18% 68%)' }}
            >
              Get a personalised AI growth diagnosis — powered by TekKeys consulting intelligence. Understand your revenue leakage, growth gaps, and the exact systems needed to scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <a
                href="#diagnosis"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, hsl(230 95% 62%), hsl(220 100% 56%))', boxShadow: '0 4px 18px hsl(230 95% 65% / 0.32)' }}
              >
                Full Diagnosis <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#ffffff' }}
              >
                <Play className="w-3.5 h-3.5" /> Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex items-center gap-8"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(230 95% 65% / 0.15)', border: '1px solid hsl(230 95% 65% / 0.25)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'hsl(230 95% 70%)' }} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg leading-none text-white">{value}</div>
                    <div className="text-[10px] font-mono tracking-wide mt-0.5" style={{ color: 'hsl(218 18% 50%)' }}>{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap gap-4 text-[11px] font-mono tracking-wide"
              style={{ color: 'hsl(218 18% 42%)' }}
            >
              {['✓ No spam', '✓ 2-minute diagnosis', '✓ Personalised results', '✓ Free to start'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Search */}
          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:pt-8"
          >
            <SearchBlock />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity: contentOp }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'hsl(218 18% 38%)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, hsl(230 95% 65% / 0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
