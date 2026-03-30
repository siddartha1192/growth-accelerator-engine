import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Building2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { caseStudies } from '@/data/caseStudies';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudiesList() {
  return (
    <div className="min-h-screen text-foreground" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-12" style={{ minHeight: '480px' }}>
        {/* Background photo */}
        <img
          src="/pics/tech1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ filter: 'brightness(0.65) saturate(1.05)' }}
          draggable={false}
        />
        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(4,9,28,0.25) 0%, rgba(4,9,28,0.55) 65%, hsl(222 50% 6%) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(30,64,175,0.12) 0%, transparent 55%)' }} />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
          style={{ borderTop: '1px solid rgba(59,130,246,0.35)', borderLeft: '1px solid rgba(59,130,246,0.35)' }} />
        <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
          style={{ borderBottom: '1px solid rgba(14,165,233,0.2)', borderRight: '1px solid rgba(14,165,233,0.2)' }} />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-5"
              style={{ color: 'hsl(213 100% 68%)', border: '1px solid hsl(213 100% 68% / 0.3)', background: 'hsl(213 100% 68% / 0.08)' }}>
              PROOF OF WORK
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white leading-tight mb-5">
              Systems That{' '}
              <span style={{
                background: 'linear-gradient(100deg, hsl(213 100% 72%), hsl(195 100% 60%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Delivered Results
              </span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'hsl(213 30% 65%)' }}>
              Real businesses. Real numbers. Before and after — with nothing hidden. Every case study below is a system we designed, built, and delivered.
            </p>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { val: '200+', label: 'Businesses Scaled' },
              { val: '2–3×', label: 'Average Revenue Growth' },
              { val: '70%', label: 'Avg. Cost Reduction' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono font-black text-3xl text-white">{s.val}</div>
                <div className="text-xs mt-1 font-mono" style={{ color: 'hsl(213 30% 55%)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Case study cards */}
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 space-y-8">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
          >
            <Link
              to={`/case-studies/${cs.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'hsl(220 30% 9%)',
                border: '1px solid hsl(216 30% 16%)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'hsl(220 100% 62% / 0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(216 30% 16%)')}
            >
              {/* Top accent bar */}
              <div className="h-[2px] w-full"
                style={{ background: 'linear-gradient(90deg, hsl(220 100% 62%), hsl(195 100% 55%), transparent)' }} />

              <div className="p-7 md:p-8 grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-6 items-center">

                {/* Stats column */}
                <div className="flex md:flex-col gap-5 flex-wrap">
                  {cs.stats.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-mono font-black text-2xl md:text-3xl leading-none"
                        style={{ color: 'hsl(220 100% 68%)' }}>
                        {s.val}
                      </div>
                      {s.label && (
                        <div className="text-[11px] mt-0.5 font-mono" style={{ color: 'hsl(213 25% 52%)' }}>{s.label}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Content column */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'hsl(213 25% 52%)' }}>
                      <Building2 className="w-3.5 h-3.5" /> {cs.industry}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'hsl(213 25% 52%)' }}>
                      <Clock className="w-3.5 h-3.5" /> {cs.timeline}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                    {cs.headline}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(213 20% 62%)' }}>
                    {cs.subheadline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-mono"
                        style={{ background: 'hsl(220 100% 62% / 0.08)', color: 'hsl(220 100% 68%)', border: '1px solid hsl(220 100% 62% / 0.2)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'hsl(220 100% 62% / 0.12)', border: '1px solid hsl(220 100% 62% / 0.25)' }}>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: 'hsl(220 100% 68%)' }} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1280px] mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-sm mb-5" style={{ color: 'hsl(213 25% 55%)' }}>
            Want results like these for your business?
          </p>
          <a
            href="/ai-growth-engine"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            style={{
              background: 'linear-gradient(135deg, hsl(220 100% 58%), hsl(195 100% 48%))',
              boxShadow: '0 4px 20px hsl(220 100% 60% / 0.35)',
            }}
          >
            Get My Free Growth Diagnosis <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
