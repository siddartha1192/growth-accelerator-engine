import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

const cases = [
  {
    stats: [{ val: '3X', label: 'Revenue Growth' }, { val: '₹12Cr → ₹36Cr', label: '' }, { val: '11', label: 'Months' }],
    industry: 'Services Firm — B2B Consulting',
    headline: 'Fragmented to Focused',
    body: 'The client had no unified lead management system. We deployed an AI-powered CRM + automation layer that tripled their qualified pipeline within a quarter.',
    tags: ['Growth Systems', 'CRM', 'AI Automation'],
  },
  {
    stats: [{ val: '180%', label: 'Revenue Increase' }, { val: '0', label: 'New Hires' }],
    industry: 'Healthcare Clinic — Lead & Patient Automation',
    headline: 'Zero to Automated',
    body: 'Automated the entire patient acquisition funnel — from ads to appointment booking — resulting in 180% revenue growth without adding a single team member.',
    tags: ['Healthcare', 'Automation', 'Lead Gen'],
  },
  {
    stats: [{ val: '70%', label: 'Ops Cost Reduction' }, { val: '4X', label: 'Output Capacity' }],
    industry: 'Manufacturing SME — Process Automation',
    headline: 'Manual to Machine',
    body: 'Replaced manual workflows with intelligent automation systems, cutting operational costs by 70% while quadrupling output capacity.',
    tags: ['Manufacturing', 'Process', 'Automation'],
  },
];

export default function CaseStudies() {
  const { ref, isInView } = useInView();

  return (
    <section id="case-studies" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">PROOF OF WORK</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4">Systems That Delivered Results</h2>
        </motion.div>

        <div className="space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8"
            >
              <div className="flex flex-wrap md:flex-col gap-4">
                {c.stats.map((s, j) => (
                  <div key={j}>
                    <span className="font-mono text-2xl md:text-3xl font-bold tk-accent-primary">{s.val}</span>
                    {s.label && <div className="text-xs tk-text-muted mt-0.5">{s.label}</div>}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-xs tk-text-muted">{c.industry}</span>
                <h3 className="font-display font-bold text-xl mt-1 mb-2">{c.headline}</h3>
                <p className="text-sm tk-text-secondary leading-relaxed mb-4">{c.body}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'hsl(220 100% 62% / 0.1)', color: 'hsl(220 100% 62%)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-sm tk-accent-primary hover:gap-3 transition-all">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
