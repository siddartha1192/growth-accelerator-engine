import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  { category: 'GROWTH SYSTEMS', title: "Why 80% of Indian SMEs Can't Scale Past ₹25Cr (And the Systems Fix)", teaser: 'The hidden infrastructure gap that keeps mid-size businesses stuck — and the 3-step framework to break through.', readTime: '6 min' },
  { category: 'AI AUTOMATION', title: 'How AI Automation Cut Operational Costs by 70% for a ₹40Cr Manufacturer', teaser: 'A detailed breakdown of how intelligent workflow automation transformed a traditional manufacturing business.', readTime: '8 min' },
  { category: 'STRATEGY', title: 'The 4-D Framework: How TekKeys Approaches Business Transformation', teaser: 'Dream, Draw, Deliver, Disrupt — the methodology behind every successful TekKeys engagement.', readTime: '5 min' },
];

export default function InsightsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="insights" ref={ref} className="py-24" style={{ backgroundColor: 'hsl(222 35% 9%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">INSIGHTS</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4 mb-4">TekKeys Intelligence</h2>
          <p className="text-lg tk-text-secondary max-w-[600px] mx-auto">
            Frameworks, case breakdowns, and growth thinking for ambitious businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              <span className="text-[10px] font-mono tracking-widest tk-accent-primary mb-3">{a.category}</span>
              <h3 className="font-display font-semibold text-base mb-2 leading-snug">{a.title}</h3>
              <p className="text-xs tk-text-secondary flex-1 mb-4">{a.teaser}</p>
              <div className="flex items-center justify-between text-xs tk-text-muted">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime}</span>
                <span className="tk-accent-primary flex items-center gap-1">Read Article <ArrowRight className="w-3 h-3" /></span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-sm tk-accent-primary hover:gap-3 transition-all">
            View All Insights <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
