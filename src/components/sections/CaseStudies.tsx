import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';

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
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8"
            >
              {/* Stats column */}
              <div className="flex flex-wrap md:flex-col gap-4">
                {c.stats.map((s, j) => (
                  <div key={j}>
                    <span className="font-mono text-2xl md:text-3xl font-bold tk-accent-primary">{s.val}</span>
                    {s.label && <div className="text-xs tk-text-muted mt-0.5">{s.label}</div>}
                  </div>
                ))}
              </div>

              {/* Content column */}
              <div>
                <span className="text-xs tk-text-muted">{c.industry}</span>
                <h3 className="font-display font-bold text-xl mt-1 mb-2">{c.headline}</h3>
                <p className="text-sm tk-text-secondary leading-relaxed mb-4">{c.subheadline}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {c.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'hsl(220 100% 62% / 0.1)', color: 'hsl(220 100% 62%)' }}>{t}</span>
                  ))}
                </div>
                <Link
                  to={`/case-studies/${c.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: 'hsl(220 100% 62%)' }}
                >
                  Read Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
