import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Wrench, TrendingUp, Zap, CheckCircle2, ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useInView } from '@/hooks/useInView';
import { caseStudies } from '@/data/caseStudies';
import type { CaseStudy } from '@/data/caseStudies';

const BLUE = 'hsl(220 100% 62%)';
const BG = 'hsl(222 50% 6%)';
const CARD_BG = 'hsl(220 27% 11%)';
const BORDER = 'hsl(216 30% 18%)';

function HeroSection({ c }: { c: CaseStudy }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
      {/* Full-bleed photo */}
      <img
        src={c.image}
        alt={c.headline}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'brightness(0.65) saturate(1.05)' }}
        draggable={false}
      />
      {/* Dark gradient overlay — heavy at bottom so stats stay readable */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(4,9,28,0.2) 0%, rgba(4,9,28,0.5) 55%, rgba(4,9,28,0.95) 100%)' }} />
      {/* Left-side blue glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(30,64,175,0.1) 0%, transparent 60%)' }} />
      <div className="max-w-[1100px] mx-auto px-6 relative z-10 pt-24 pb-16">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/#case-studies"
            className="inline-flex items-center gap-2 text-xs font-medium mb-8 transition-all hover:gap-3"
            style={{ color: 'hsl(218 18% 62%)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
          </Link>
        </motion.div>

        {/* Industry label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold"
            style={{ color: BLUE }}
          >
            {c.industry}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display font-extrabold text-4xl md:text-6xl mt-3 mb-4 leading-[1.08]"
          style={{ color: 'hsl(224 100% 97%)' }}
        >
          {c.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-base md:text-lg leading-relaxed max-w-[720px] mb-8"
          style={{ color: 'hsl(218 18% 62%)' }}
        >
          {c.subheadline}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'hsl(220 100% 62% / 0.12)', color: BLUE, border: '1px solid hsl(220 100% 62% / 0.2)' }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {c.stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center"
              style={{
                background: 'rgba(10,18,50,0.65)',
                border: '1px solid rgba(99,155,255,0.25)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div
                className="font-mono font-extrabold text-2xl md:text-3xl"
                style={{ color: BLUE }}
              >
                {s.val}
              </div>
              {s.label && (
                <div className="text-xs mt-1 leading-snug" style={{ color: 'hsl(218 18% 62%)' }}>
                  {s.label}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChallengeSection({ text }: { text: string }) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-20" style={{ backgroundColor: 'hsl(222 40% 8%)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start"
        >
          <div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'hsl(220 100% 62% / 0.12)', border: '1px solid hsl(220 100% 62% / 0.2)' }}
            >
              <Zap className="w-5 h-5" style={{ color: BLUE }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold block" style={{ color: BLUE }}>
              The Challenge
            </span>
          </div>
          <p className="text-base md:text-lg leading-[1.8]" style={{ color: 'hsl(218 20% 72%)' }}>
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection({ text }: { text: string }) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-20" style={{ backgroundColor: BG }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start"
        >
          <div>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'hsl(220 100% 62% / 0.12)', border: '1px solid hsl(220 100% 62% / 0.2)' }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: BLUE }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold block" style={{ color: BLUE }}>
              Our Solution
            </span>
          </div>
          <p className="text-base md:text-lg leading-[1.8]" style={{ color: 'hsl(218 20% 72%)' }}>
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function BeforeAfterSection({
  before,
  after,
}: {
  before: { metric: string; value: string }[];
  after: { metric: string; value: string }[];
}) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-20" style={{ backgroundColor: 'hsl(222 40% 8%)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: BLUE }}>
            Before vs After
          </span>
          <h2
            className="font-display font-extrabold text-2xl md:text-4xl mt-3"
            style={{ color: 'hsl(224 100% 97%)' }}
          >
            The Measurable Difference
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid hsl(0 60% 40% / 0.25)' }}
          >
            <div
              className="px-6 py-4 flex items-center gap-2"
              style={{ backgroundColor: 'hsl(0 50% 12% / 0.9)', borderBottom: '1px solid hsl(0 60% 40% / 0.2)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'hsl(0 70% 50%)' }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: 'hsl(0 70% 65%)' }}
              >
                Before TekKeys
              </span>
            </div>
            <div style={{ backgroundColor: 'hsl(0 30% 8% / 0.95)' }}>
              {before.map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-start justify-between gap-4"
                  style={{
                    borderBottom: i < before.length - 1 ? '1px solid hsl(0 40% 20% / 0.3)' : 'none',
                  }}
                >
                  <span className="text-sm leading-snug" style={{ color: 'hsl(0 10% 55%)' }}>
                    {item.metric}
                  </span>
                  <span
                    className="font-mono font-semibold text-sm text-right flex-shrink-0"
                    style={{ color: 'hsl(0 60% 58%)' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid hsl(220 100% 62% / 0.3)' }}
          >
            <div
              className="px-6 py-4 flex items-center gap-2"
              style={{
                backgroundColor: 'hsl(220 60% 14% / 0.95)',
                borderBottom: '1px solid hsl(220 100% 62% / 0.2)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: BLUE }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: BLUE }}
              >
                After TekKeys
              </span>
            </div>
            <div style={{ backgroundColor: 'hsl(220 40% 9% / 0.98)' }}>
              {after.map((item, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-start justify-between gap-4"
                  style={{
                    borderBottom: i < after.length - 1 ? '1px solid hsl(220 100% 62% / 0.1)' : 'none',
                  }}
                >
                  <span className="text-sm leading-snug" style={{ color: 'hsl(218 18% 62%)' }}>
                    {item.metric}
                  </span>
                  <span
                    className="font-mono font-bold text-sm text-right flex-shrink-0"
                    style={{ color: 'hsl(220 100% 72%)' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection({ results }: { results: string[] }) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-20" style={{ backgroundColor: BG }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: BLUE }}>
            Results
          </span>
          <h2
            className="font-display font-extrabold text-2xl md:text-4xl mt-3"
            style={{ color: 'hsl(224 100% 97%)' }}
          >
            What This Delivered
          </h2>
        </motion.div>
        <div className="space-y-4">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
            >
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: BLUE }}
              />
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'hsl(218 20% 72%)' }}>
                {r}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaRow({
  timeline,
  client,
  tools,
}: {
  timeline: string;
  client: string;
  tools: string[];
}) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: 'hsl(222 40% 8%)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" style={{ color: BLUE }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: BLUE }}>
                Timeline
              </span>
            </div>
            <p className="text-xl font-display font-bold" style={{ color: 'hsl(224 100% 97%)' }}>
              {timeline}
            </p>
            <p className="text-xs mt-1" style={{ color: 'hsl(218 18% 55%)' }}>
              From kick-off to measurable results
            </p>
          </motion.div>

          {/* Client */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: BLUE }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: BLUE }}>
                Client
              </span>
            </div>
            <p className="text-base font-semibold" style={{ color: 'hsl(224 100% 97%)' }}>
              {client}
            </p>
            <p className="text-xs mt-1" style={{ color: 'hsl(218 18% 55%)' }}>
              Identity anonymised by request
            </p>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4" style={{ color: BLUE }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: BLUE }}>
                Tools & Technology
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: 'hsl(220 100% 62% / 0.1)',
                    color: 'hsl(220 100% 72%)',
                    border: '1px solid hsl(220 100% 62% / 0.18)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ backgroundColor: BG }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(220 100% 62% / 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: BLUE }}>
            Ready to Scale?
          </span>
          <h2
            className="font-display font-extrabold text-3xl md:text-5xl mt-4 mb-5 leading-[1.1]"
            style={{ color: 'hsl(224 100% 97%)' }}
          >
            Results like these are{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(220 100% 62%), hsl(185 100% 55%))',
              }}
            >
              engineered, not accidental.
            </span>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'hsl(218 18% 62%)' }}>
            Book a free AI Growth Diagnostic. We'll map exactly which systems your business needs — and what results you can expect in 90 days.
          </p>
          <Link
            to="/ai-growth-engine"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, hsl(230 95% 58%), hsl(220 100% 50%))',
              boxShadow: '0 4px 24px hsl(230 95% 60% / 0.4)',
            }}
          >
            <Calendar className="w-4 h-4" />
            Book Your Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: BG }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 px-6 text-center pt-20">
          <h1 className="font-display font-bold text-3xl" style={{ color: 'hsl(224 100% 97%)' }}>
            Case Study Not Found
          </h1>
          <p style={{ color: 'hsl(218 18% 62%)' }}>
            The case study you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/#case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium mt-2"
            style={{ color: BLUE }}
          >
            <ArrowLeft className="w-4 h-4" /> View All Case Studies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, color: 'hsl(224 100% 97%)' }}>
      <Navbar />
      <HeroSection c={study} />
      <ChallengeSection text={study.challenge} />
      <SolutionSection text={study.solution} />
      <BeforeAfterSection before={study.before} after={study.after} />
      <ResultsSection results={study.results} />
      <MetaRow timeline={study.timeline} client={study.client} tools={study.tools} />
      <CTASection />
      <Footer />
    </div>
  );
}
