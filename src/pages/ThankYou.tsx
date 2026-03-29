import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, BarChart3, Map, Lightbulb, Users, Zap, Shield,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    icon: BarChart3,
    title: 'Complete Revenue Gap Audit',
    desc: 'A line-by-line breakdown of where your revenue is leaking and exactly how much you\'re leaving on the table each month.',
  },
  {
    icon: Map,
    title: 'Custom AI Strategy Roadmap',
    desc: 'A tailored 6-month plan built around your specific business model, industry, and growth goals — not a generic template.',
  },
  {
    icon: Lightbulb,
    title: '90-Day Growth Blueprint',
    desc: 'Prioritised, actionable steps you can execute immediately — ranked by impact so you focus on what moves the needle first.',
  },
  {
    icon: Users,
    title: '1-on-1 Strategy Session',
    desc: 'A 45-minute live session with a TekKeys consultant to walk through your results and answer every question you have.',
  },
  {
    icon: Zap,
    title: 'AI Automation Opportunities',
    desc: 'Specific automations we\'ll identify in your workflow that can cut operational costs by up to 70% within 90 days.',
  },
  {
    icon: Shield,
    title: 'Competitive Moat Analysis',
    desc: 'Understand exactly where your competitors are beating you — and the precise systems to close that gap permanently.',
  },
];

export default function ThankYou() {
  const { state } = useLocation() as { state: { painPoint?: string; phone?: string; email?: string } | null };
  const navigate = useNavigate();

  const goToFullAnalysis = () => {
    navigate('/');
    // Wait for home page to mount, then scroll to the section
    setTimeout(() => {
      document.getElementById('diagnosis')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  const painPoint = state?.painPoint;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#04091c' }}>

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(230 95% 65%) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 55%) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 py-16 sm:py-24">

        {/* ── Thank You Hero ── */}
        <div className="flex flex-col items-center text-center mb-20">

          {/* Animated check */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(230 95% 65% / 0.12)', border: '1px solid hsl(230 95% 65% / 0.3)' }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: 'hsl(185 100% 55%)' }} />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{ background: 'radial-gradient(circle, hsl(230 95% 65% / 0.3) 0%, transparent 70%)' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase"
              style={{ background: 'hsl(185 100% 55% / 0.1)', border: '1px solid hsl(185 100% 55% / 0.25)', color: 'hsl(185 100% 62%)' }}>
              Diagnosis Received
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white mt-4 mb-5"
          >
            You're on your way to{' '}
            <span style={{
              background: 'linear-gradient(100deg, hsl(230 95% 72%) 0%, hsl(185 100% 58%) 50%, hsl(270 85% 72%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              2–3× growth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
            className="text-base sm:text-lg leading-relaxed max-w-[580px] mb-4"
            style={{ color: 'hsl(218 18% 65%)' }}
          >
            {painPoint
              ? <>We've received your challenge — <em style={{ color: 'hsl(218 18% 80%)', fontStyle: 'normal' }}>"{painPoint}"</em>. Our team is already analysing it and will send your personalised diagnosis shortly.</>
              : 'Our team is already working on your personalised diagnosis and will send it to you shortly.'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-[12px] font-mono"
            style={{ color: 'hsl(218 18% 40%)' }}
          >
            Expected delivery: within 24 hours &nbsp;·&nbsp; No spam, ever
          </motion.p>
        </div>

        {/* ── Full Analysis CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
          className="rounded-2xl p-8 sm:p-10 mb-16 text-center"
          style={{
            background: 'hsl(220 30% 8% / 0.7)',
            border: '1px solid hsl(230 95% 65% / 0.2)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 60px hsl(230 95% 65% / 0.08)',
          }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase mb-4"
            style={{ background: 'hsl(230 95% 65% / 0.1)', border: '1px solid hsl(230 95% 65% / 0.25)', color: 'hsl(230 95% 72%)' }}>
            Want deeper results?
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3">
            Get Your Full Analysis
          </h2>
          <p className="text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto mb-7"
            style={{ color: 'hsl(218 18% 62%)' }}>
            The quick diagnosis scratches the surface. The Full Analysis goes deep — a complete audit of your business, a custom AI roadmap, and a 1-on-1 session to implement it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={goToFullAnalysis}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, hsl(230 95% 62%), hsl(185 100% 48%))', boxShadow: '0 4px 28px hsl(230 95% 65% / 0.4)' }}
            >
              Start Full Analysis <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: 'hsl(218 18% 50%)' }}
            >
              Back to home
            </Link>
          </div>
        </motion.div>

        {/* ── Benefits grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          <p className="text-center text-[11px] font-mono tracking-[0.15em] uppercase mb-8"
            style={{ color: 'hsl(218 18% 40%)' }}>
            What's included in the Full Analysis
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.45, ease: EASE }}
                className="flex flex-col gap-3 p-5 rounded-xl"
                style={{
                  background: 'hsl(220 30% 8% / 0.5)',
                  border: '1px solid hsl(216 30% 16%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'hsl(230 95% 65% / 0.1)', border: '1px solid hsl(230 95% 65% / 0.2)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'hsl(230 95% 70%)' }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-white mb-1">{title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'hsl(218 18% 55%)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="text-center text-[11px] font-mono mt-14"
          style={{ color: 'hsl(218 18% 32%)' }}
        >
          TekKeys &nbsp;·&nbsp; AI-Powered Business Growth &nbsp;·&nbsp; tekkeys.com
        </motion.p>
      </div>
    </div>
  );
}
