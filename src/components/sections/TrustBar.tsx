import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 500, suffix: 'Cr+', prefix: '₹', label: 'Revenue Impacted', sub: 'across all engagements', color: '#ffffff' },
  { value: 40,  suffix: '+',   prefix: '', label: 'Projects Delivered', sub: 'end-to-end transformations', color: 'hsl(220 80% 72%)' },
  { value: 3,   suffix: 'X',   prefix: '', label: 'Avg Growth Multiple', sub: 'within 12 months', color: 'hsl(230 95% 65%)' },
  { value: 9,   suffix: ' Mo', prefix: '', label: 'Fastest Scale', sub: 'seed to ₹10Cr ARR', color: 'hsl(215 70% 80%)' },
];

const industries = ['Clinics & Healthcare', 'Real Estate', 'SaaS', 'Manufacturing', 'Professional Services', 'D2C & Retail'];

function StatCard({ value, suffix, prefix, label, sub, color, index }: typeof stats[0] & { index: number }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center text-center px-6 py-8 group"
    >
      {/* Vertical divider — shown between cards */}
      {index > 0 && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }}
        />
      )}

      {/* Big animated number */}
      <div
        className="font-display font-extrabold leading-none mb-1"
        style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          background: `linear-gradient(135deg, #ffffff 0%, ${color} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
        }}
      >
        {prefix}{count}{suffix}
      </div>

      {/* Animated underline bar */}
      <motion.div
        className="h-px w-12 mb-3 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12 + 0.4, duration: 0.8 }}
        style={{ background: `linear-gradient(90deg, ${color}, transparent)`, transformOrigin: 'left' }}
      />

      {/* Label */}
      <div className="text-sm font-semibold text-white mb-1">{label}</div>
      <div className="text-[11px] font-mono" style={{ color: 'hsl(218 18% 50%)' }}>{sub}</div>
    </motion.div>
  );
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">

      {/* ── Photo background ── */}
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-[-30px]" style={{ y: bgY }}>
          <img
            src="/pics/tech3.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'hsl(222 50% 4% / 0.92)' }} />

        {/* Subtle center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(230 95% 65% / 0.07) 0%, transparent 70%)',
          }}
        />

        {/* Top & bottom border lines */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)' }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-[10px] font-mono tracking-[0.28em] uppercase px-4 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Trusted by Growth-Stage Businesses
          </span>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Industry pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mr-2" style={{ color: 'hsl(218 18% 38%)' }}>
            Industries
          </span>
          {industries.map((ind) => (
            <span
              key={ind}
              className="text-[11px] px-3.5 py-1.5 rounded-full font-mono"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'hsl(218 18% 58%)',
              }}
            >
              {ind}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
