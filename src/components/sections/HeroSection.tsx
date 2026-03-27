import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const placeholders = [
  "Describe your biggest business challenge right now...",
  "What's holding back your revenue growth?",
  "Tell us about your business and goals...",
  "We're losing leads but can't figure out why...",
];

const chips = [
  { emoji: '💡', text: 'We need more qualified leads' },
  { emoji: '⚙️', text: 'Our operations are too manual' },
  { emoji: '📊', text: 'We need better business insights' },
];

export default function HeroSection() {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setPlaceholderIdx((i) => (i + 1) % placeholders.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: 'hsl(222 50% 6%)' }}
    >
      {/* Cursor glow */}
      <div
        className="absolute pointer-events-none z-0 hidden lg:block"
        style={{
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, hsl(220 100% 62% / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      {/* Gradient blobs */}
      <div className="gradient-mesh-blob w-[500px] h-[500px] top-20 right-0 opacity-30" style={{ background: 'hsl(220 100% 62% / 0.15)', filter: 'blur(120px)' }} />
      <div className="gradient-mesh-blob w-[300px] h-[300px] bottom-40 left-10 opacity-20" style={{ background: 'hsl(190 100% 50% / 0.1)', filter: 'blur(100px)' }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              border: '1px solid hsl(220 100% 62% / 0.3)',
              backgroundColor: 'hsl(220 100% 62% / 0.1)',
              color: 'hsl(220 100% 62%)',
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI-Powered Growth Intelligence Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-2"
          >
            Tell Us About
            <br />
            Your Business.
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-gradient-blue mb-6"
          >
            We'll Show You
            <br />
            How to 2–3X It.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl tk-text-secondary max-w-[600px] mx-auto mb-10 font-light"
          >
            Get a personalised AI growth diagnosis — powered by TekKeys consulting intelligence. Understand your revenue leakage, growth gaps, and the exact systems needed to scale.
          </motion.p>

          {/* Big search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 }}
            className="max-w-[680px] mx-auto mb-4"
          >
            <div className="relative flex items-center h-14 md:h-16 rounded-2xl px-4 transition-all focus-within:shadow-[0_0_0_4px_hsl(220_100%_62%_/_0.1)]"
              style={{
                backgroundColor: 'hsl(220 25% 16% / 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid hsl(216 30% 18%)',
              }}
            >
              <Sparkles className="w-5 h-5 tk-accent-cyan flex-shrink-0 mr-3" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholders[placeholderIdx]}
                className="flex-1 bg-transparent text-foreground text-sm md:text-base placeholder:tk-text-secondary focus:outline-none"
              />
              <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {chips.map((chip) => (
                <button
                  key={chip.text}
                  onClick={() => setInputValue(chip.text)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs tk-text-secondary hover:text-foreground transition-colors"
                  style={{ border: '1px solid hsl(216 30% 18%)', backgroundColor: 'hsl(220 25% 16% / 0.4)' }}
                >
                  {chip.emoji} {chip.text}
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <a
              href="#diagnosis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Start Full Growth Diagnosis <ArrowRight className="w-4 h-4" />
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-foreground transition-colors"
              style={{ border: '1px solid hsl(0 0% 100% / 0.2)' }}>
              <Play className="w-4 h-4" /> Watch How It Works
            </button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 text-xs tk-text-muted"
          >
            {['✓ No spam', '✓ 2-minute diagnosis', '✓ Personalised results', '✓ Free to start'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
