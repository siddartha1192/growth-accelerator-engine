import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Users, ArrowRight, ChevronDown } from 'lucide-react';

const phases = [
  {
    id: 'D1',
    label: 'DREAM',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    tagline: 'Clarity before code.',
    desc: 'Every transformation starts with a ruthlessly clear picture of where you are and where you need to go. We run deep-dive discovery sessions with your leadership team to surface the real growth blockers, align on measurable targets, and build the strategic foundation the entire engagement rests on.',
    timeline: '2 weeks',
    team: 'CEO · Strategy Lead · Growth Analyst',
    steps: [
      { n: '01', title: 'Discovery Call', detail: 'A 90-minute structured session to map your current business model, revenue streams, and growth constraints.' },
      { n: '02', title: 'Business Audit', detail: 'A full diagnostic of your operations, tech stack, sales pipeline, and market position.' },
      { n: '03', title: 'Vision Workshop', detail: 'A half-day workshop with key stakeholders to define the 12-month vision and success metrics.' },
      { n: '04', title: 'Growth Framework', detail: 'We produce a written Growth Blueprint — the single source of truth for the entire engagement.' },
    ],
    deliverables: [
      'Vision & growth targets document',
      'Market opportunity analysis',
      'Competitive landscape report',
      'KPI & OKR framework',
      'Prioritised constraint list',
    ],
    metrics: [{ value: '100%', label: 'Stakeholder Alignment' }, { value: '2×', label: 'Faster Planning' }],
    tools: ['Stakeholder interviews', 'Market benchmarking', 'OKR frameworks', 'Revenue modelling'],
  },
  {
    id: 'D2',
    label: 'DRAW',
    color: '#00c8e6',
    bg: 'rgba(0,200,230,0.07)',
    border: 'rgba(0,200,230,0.22)',
    tagline: 'Blueprint before build.',
    desc: 'With a clear vision locked in, we design the systems, architecture, and execution plans that will carry your business from its current state to the target. No guesswork — every technology choice, integration point, and workflow is mapped and signed off before a single sprint begins.',
    timeline: '3 weeks',
    team: 'Solution Architect · Tech Lead · Project Manager',
    steps: [
      { n: '01', title: 'Systems Architecture', detail: 'Design the full tech and data architecture — CRM, ERP, automation, analytics, and AI layers.' },
      { n: '02', title: 'Stack Selection', detail: 'Evaluate and select the right tools for your size, budget, and growth trajectory.' },
      { n: '03', title: 'Integration Mapping', detail: 'Document every data flow and API connection needed to make your systems talk to each other.' },
      { n: '04', title: 'Execution Roadmap', detail: 'A sprint-by-sprint delivery plan with clear owners, milestones, and go/no-go checkpoints.' },
    ],
    deliverables: [
      'Systems architecture diagram',
      'Technology stack recommendation',
      'Integration specification',
      'Sprint-level project plan',
      'Risk & dependency register',
    ],
    metrics: [{ value: '50%', label: 'Dev Time Saved' }, { value: '99%', label: 'Architecture Accuracy' }],
    tools: ['System design (C4 model)', 'API mapping', 'Infrastructure planning', 'Cost modelling'],
  },
  {
    id: 'D3',
    label: 'DELIVER',
    color: '#00d696',
    bg: 'rgba(0,214,150,0.07)',
    border: 'rgba(0,214,150,0.22)',
    tagline: 'On time. On budget. Every time.',
    desc: 'Execution is where most transformation programmes fail. Our delivery model runs in two-week agile sprints with weekly stakeholder check-ins, automated testing pipelines, and a hard no-surprises commitment. We build, test, and release in phases — de-risking adoption and ensuring the business never misses a beat.',
    timeline: '8–16 weeks',
    team: 'Delivery Lead · Dev Squad · QA Engineer · Change Manager',
    steps: [
      { n: '01', title: 'Sprint Planning', detail: 'Each sprint is scoped to ship something tangible — no months-long dark periods.' },
      { n: '02', title: 'Build & Integrate', detail: 'Agile development with daily standups, version control, and CI/CD pipelines.' },
      { n: '03', title: 'QA & UAT', detail: 'Automated test suites plus structured user acceptance testing with your team.' },
      { n: '04', title: 'Phased Rollout', detail: 'Staged deployments to limit risk, with rollback procedures ready at every gate.' },
    ],
    deliverables: [
      'Working software — each sprint',
      'Test coverage reports',
      'User training materials',
      'Deployment runbooks',
      'Go-live sign-off documentation',
    ],
    metrics: [{ value: '3×', label: 'Faster Delivery' }, { value: '40%', label: 'Cost Reduction' }],
    tools: ['Agile / Scrum', 'CI/CD pipelines', 'Automated testing', 'Stakeholder dashboards'],
  },
  {
    id: 'D4',
    label: 'DISRUPT',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.22)',
    tagline: 'Never stop compounding.',
    desc: 'Going live is the beginning, not the end. The Disrupt phase plugs AI-driven monitoring into everything we built — tracking performance, predicting issues before they surface, and running continuous optimisation cycles. Your competitors are standing still while you compound.',
    timeline: 'Ongoing',
    team: 'Growth Engineer · Data Analyst · AI Specialist · Account Lead',
    steps: [
      { n: '01', title: 'Performance Monitoring', detail: 'Real-time dashboards track every KPI defined in the Dream phase — zero blind spots.' },
      { n: '02', title: 'AI Optimisation', detail: 'Machine learning models analyse patterns in your pipeline and surface actionable recommendations weekly.' },
      { n: '03', title: 'A/B & Growth Testing', detail: 'Continuous experimentation on acquisition, conversion, and retention levers.' },
      { n: '04', title: 'Quarterly Growth Reviews', detail: 'A deep-dive every quarter to reset targets, expand scope, and outmanoeuvre competition.' },
    ],
    deliverables: [
      'Live performance dashboard',
      'Monthly AI optimisation reports',
      'A/B test results & recommendations',
      'Quarterly business review deck',
      'Competitive intelligence briefings',
    ],
    metrics: [{ value: '10×', label: 'Growth Potential' }, { value: '24/7', label: 'AI Monitoring' }],
    tools: ['Real-time analytics', 'ML optimisation models', 'Competitive tracking', 'Growth experiment framework'],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_DURATION = 6000; // ms per phase

export default function FrameworkDiagram() {
  const [active, setActive]   = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [paused, setPaused]   = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phase = phases[active];

  /* ── Auto-advance ── */
  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % phases.length);
    }, AUTO_DURATION);
  };

  useEffect(() => {
    if (!paused) startCycle();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const handleManualSelect = (i: number) => {
    setActive(i);
    setPaused(false);
    startCycle(); // reset timer
  };

  return (
    <div style={{ backgroundColor: 'hsl(220 30% 7%)' }}>

      {/* ── Hero banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: 'hsl(220 40% 5%)' }}>

        {/* Background image */}
        <img src="/pics/tech3.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ opacity: 0.9, filter: 'brightness(0.65) saturate(1.15)' }} />

        {/* Gradient overlays — left strip only for text legibility */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(4,9,28,0.78) 0%, rgba(4,9,28,0.35) 40%, rgba(4,9,28,0.05) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(4,9,28,0.15) 0%, transparent 30%, rgba(4,9,28,0.4) 100%)' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.4 }} />

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
          style={{ borderTop: '1px solid rgba(59,130,246,0.35)', borderLeft: '1px solid rgba(59,130,246,0.35)' }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
          style={{ borderBottom: '1px solid rgba(0,200,230,0.25)', borderRight: '1px solid rgba(0,200,230,0.25)' }} />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 md:py-28">
          <span className="section-label" style={{ color: 'hsl(210 100% 70%)', borderColor: 'hsl(210 100% 70% / 0.3)' }}>4-D FRAMEWORK</span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 mb-5 leading-tight text-white">
            The TekKeys{' '}
            <span className="text-gradient-blue">Transformation Model</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: 'hsl(210 60% 82%)' }}>
            A battle-tested four-phase methodology that takes businesses from unclear vision to compounding, AI-driven growth. Every phase is fixed in scope, transparent in cost, and accountable to measurable outcomes.
          </p>

          {/* Phase flow — visual pipeline */}
          <div className="flex flex-wrap items-center gap-0">
            {phases.map((p, i) => (
              <div key={p.id} className="flex items-center">
                <button
                  onClick={() => handleManualSelect(i)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-bold transition-all duration-300"
                  style={{
                    backgroundColor: active === i ? p.color : 'transparent',
                    color: active === i ? '#fff' : p.color,
                    border: `1.5px solid ${p.color}`,
                    opacity: active === i ? 1 : 0.6,
                    boxShadow: active === i ? `0 0 20px ${p.color}55` : 'none',
                  }}>
                  <span>{p.id}</span>
                  <span className="font-sans font-medium">{p.label}</span>
                </button>
                {i < phases.length - 1 && (
                  <motion.div
                    className="w-8 h-px mx-1"
                    style={{ background: `linear-gradient(90deg, ${p.color}80, ${phases[i+1].color}80)` }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase tab strip with auto-progress ──────────────── */}
      <div style={{ backgroundColor: 'hsl(220 30% 7%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex overflow-x-auto">
            {phases.map((p, i) => (
              <button key={p.id} onClick={() => handleManualSelect(i)}
                className="relative flex-shrink-0 flex flex-col items-start px-6 py-5 transition-all duration-300 overflow-hidden"
                style={{ borderBottom: active === i ? `3px solid ${p.color}` : '3px solid transparent' }}>

                {/* Auto-progress bar — only on active tab */}
                {active === i && !paused && (
                  <motion.div
                    key={`progress-${active}`}
                    className="absolute bottom-0 left-0 h-[3px]"
                    style={{ background: p.color, bottom: '-3px' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: AUTO_DURATION / 1000, ease: 'linear' }}
                  />
                )}

                <span className="font-mono text-xs mb-1 transition-colors"
                  style={{ color: active === i ? p.color : 'rgba(140,165,210,0.45)' }}>{p.id}</span>
                <span className="font-display font-bold text-sm transition-colors"
                  style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.5)' }}>{p.label}</span>
                <span className="font-mono text-xs mt-0.5"
                  style={{ color: active === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)' }}>{p.timeline}</span>
              </button>
            ))}

            {/* Pause / play control */}
            <button
              onClick={() => setPaused(p => !p)}
              className="ml-auto flex-shrink-0 flex items-center gap-1.5 px-4 self-center text-[11px] font-mono rounded-full transition-all"
              style={{ color: 'rgba(140,165,210,0.5)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px' }}
            >
              {paused ? '▶ Auto' : '⏸ Pause'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Active phase detail ──────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Top row: overview + metrics */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">

              {/* Description block */}
              <div className="md:col-span-2 rounded-2xl p-7"
                style={{ backgroundColor: phase.bg, border: `1px solid ${phase.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full"
                    style={{ color: phase.color, backgroundColor: `${phase.color}18`, border: `1px solid ${phase.border}` }}>
                    {phase.id}
                  </span>
                  <span className="font-display font-extrabold text-2xl" style={{ color: phase.color }}>{phase.label}</span>
                  <span className="text-sm italic ml-auto hidden sm:block" style={{ color: 'hsl(210 50% 70%)' }}>{phase.tagline}</span>
                </div>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'hsl(210 50% 88%)' }}>{phase.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5" style={{ color: 'hsl(210 50% 70%)' }}>
                    <Clock className="w-3.5 h-3.5" /> {phase.timeline}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: 'hsl(210 50% 70%)' }}>
                    <Users className="w-3.5 h-3.5" /> {phase.team}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-4">
                {phase.metrics.map(m => (
                  <div key={m.label} className="glass-card p-5 flex items-center gap-4"
                    style={{ borderLeft: `4px solid ${phase.color}` }}>
                    <div className="font-mono font-black text-4xl leading-none" style={{ color: phase.color }}>{m.value}</div>
                    <div className="text-sm leading-snug" style={{ color: 'hsl(210 50% 80%)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-12">
              <h3 className="font-display font-bold text-xl mb-6">How It Works</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {phase.steps.map((s, i) => (
                  <motion.div key={s.n}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                    className="glass-card p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute top-4 right-4 font-mono text-4xl font-black leading-none pointer-events-none"
                      style={{ color: `${phase.color}12` }}>{s.n}</div>
                    <div className="font-mono text-xs font-bold mb-2" style={{ color: phase.color }}>{s.n}</div>
                    <h4 className="font-display font-bold text-base mb-2">{s.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(210 50% 80%)' }}>{s.detail}</p>
                    {i < phase.steps.length - 1 && (
                      <ArrowRight className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 hidden lg:block"
                        style={{ color: phase.color, opacity: 0.3 }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Deliverables + Tools */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-base mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {phase.deliverables.map((d, i) => (
                    <motion.li key={d}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm" style={{ color: 'hsl(210 50% 82%)' }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-base mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                  Tools & Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {phase.tools.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono"
                      style={{ backgroundColor: phase.bg, border: `1px solid ${phase.border}`, color: phase.color }}>
                      {t}
                    </span>
                  ))}
                </div>

                {active < 3 && (
                  <button onClick={() => handleManualSelect(active + 1)}
                    className="mt-6 w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90 group"
                    style={{ background: `linear-gradient(135deg, ${phase.color}22, ${phases[active + 1].color}22)`, border: `1px solid ${phase.border}` }}>
                    <span style={{ color: 'hsl(210 50% 70%)' }}>Next phase:</span>
                    <span className="font-bold flex items-center gap-1.5" style={{ color: phases[active + 1].color }}>
                      {phases[active + 1].id} — {phases[active + 1].label}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── All 4 phases overview strip ─────────────────────── */}
      <div style={{ backgroundColor: 'hsl(220 30% 5%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <h2 className="font-display font-bold text-2xl mb-2">The Full Journey</h2>
          <p className="text-sm mb-10 max-w-lg" style={{ color: 'hsl(210 50% 78%)' }}>
            Each phase builds on the last — from strategy through to continuous AI-driven growth.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {phases.map((p, i) => (
              <div key={p.id} className="relative">
                {i < 3 && (
                  <div className="absolute top-8 right-0 w-px h-16 lg:w-1/2 lg:h-px lg:top-8 lg:right-0 pointer-events-none"
                    style={{ background: `linear-gradient(to right, ${p.color}60, ${phases[i+1].color}60)`, zIndex: 1 }} />
                )}
                <button onClick={() => { handleManualSelect(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full text-left p-6 transition-all duration-300 hover:bg-white/[0.03] relative z-10"
                  style={{ borderTop: `3px solid ${p.color}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold" style={{ color: p.color }}>{p.id}</span>
                    <span className="font-mono text-xs" style={{ color: 'hsl(210 45% 60%)' }}>{p.timeline}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{p.label}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'hsl(210 50% 75%)' }}>{p.tagline}</p>
                  <ul className="space-y-1.5">
                    {p.deliverables.slice(0, 3).map(d => (
                      <li key={d} className="text-xs flex items-start gap-1.5" style={{ color: 'hsl(210 45% 65%)' }}>
                        <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="font-display font-bold text-2xl mb-2">Common Questions</h2>
            <p className="text-sm mb-8" style={{ color: 'hsl(210 50% 78%)' }}>Everything you need to know before starting your transformation.</p>

            {[
              { q: 'Can we skip a phase if we already have a strategy?', a: 'No phase is truly skippable — but they can be compressed. If you have a solid strategy document we can run an accelerated Dream audit in 3 days rather than 2 weeks, then move quickly into Draw.' },
              { q: 'What happens if we miss a milestone?', a: 'Every sprint has a pre-agreed go/no-go gate. If a milestone slips, we hold a root-cause session within 24 hours and reforecast together. We never simply absorb a miss and carry on.' },
              { q: 'How is TekKeys different from a traditional consultancy?', a: 'Traditional consultancies deliver reports. We deliver working systems. Every engagement ends with software running in production, not a slide deck.' },
              { q: 'What is the minimum engagement size?', a: 'The smallest meaningful engagement is the Dream + Draw phases together — typically ₹8–15L. This gives you a full strategy and build plan you can execute with any team.' },
              { q: 'Do you work with businesses outside India?', a: 'Yes — roughly 30% of our engagements are with businesses in the UAE, Singapore, and the UK. All phases are designed to run remotely without quality loss.' },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left group">
                  <span className="font-medium text-sm pr-4 group-hover:text-white transition-colors">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(210 45% 55%)' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden">
                      <p className="text-sm leading-relaxed pb-5" style={{ color: 'hsl(210 50% 78%)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="sticky top-24">
            <div className="glass-card p-8 text-center"
              style={{ border: '1px solid rgba(59,130,246,0.25)', background: 'linear-gradient(135deg, rgba(59,130,246,0.07), rgba(0,200,230,0.04))' }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(0,200,230,0.15))' }}>
                <span className="font-display font-black text-xl text-gradient-blue">TK</span>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">Ready to start your transformation?</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'hsl(210 50% 78%)' }}>
                Book a free 30-minute strategy call. We'll identify which phase is right for you and what results you can expect in 90 days.
              </p>
              <a href="/#diagnosis"
                className="block w-full py-3.5 rounded-xl text-sm font-semibold text-white text-center mb-3 hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, hsl(220 100% 62%), hsl(190 100% 50%))' }}>
                Get My Free Growth Diagnosis
              </a>
              <a href="/"
                className="block w-full py-3 rounded-xl text-sm hover:text-white transition-colors text-center"
                style={{ color: 'hsl(210 50% 65%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
