import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Rocket, GitBranch, Brain, Globe, Shield, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    icon: Rocket, num: '01', title: 'Growth Acceleration Systems',
    oneLiner: '2–3X lead conversion. Predictable revenue engine.',
    outcomes: ['30–60% increase in qualified leads', 'Faster sales cycles', 'Reduced manual follow-ups'],
  },
  {
    icon: GitBranch, num: '02', title: 'Business Process Acceleration',
    oneLiner: 'Turn operational chaos into scalable systems.',
    outcomes: ['40–70% reduction in inefficiencies', 'Workflow automation', 'Reduced human dependency'],
  },
  {
    icon: Brain, num: '03', title: 'AI & Intelligence Systems',
    oneLiner: 'Turn data into decisions that drive growth.',
    outcomes: ['Real-time business visibility', 'Predictive insights', 'AI-driven dashboards'],
  },
  {
    icon: Globe, num: '04', title: 'Digital Identity & Market Presence',
    oneLiner: 'Build a digital presence that converts.',
    outcomes: ['Stronger brand positioning', 'Higher conversion rates', 'Consistent customer experience'],
  },
  {
    icon: Shield, num: '05', title: 'Managed & Professional Services',
    oneLiner: 'Ensure your systems keep performing and scaling.',
    outcomes: ['Reliable performance', 'Continuous optimisation', 'Proactive support'],
  },
];

export default function SolutionsGrid() {
  const { ref, isInView } = useInView();

  return (
    <section id="solutions" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 35% 9%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">SOLUTIONS</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4 mb-4">What We Build For You</h2>
          <p className="text-lg tk-text-secondary max-w-[600px] mx-auto">
            Five interconnected systems that transform fragmented operations into a unified growth engine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <s.icon className="w-7 h-7 tk-accent-primary" />
                <span className="font-mono text-xs tk-text-muted">{s.num}</span>
              </div>
              <h3 className="font-display font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-xs tk-text-secondary mb-4">{s.oneLiner}</p>
              <div className="flex-1 flex flex-col gap-2 mb-4">
                {s.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-2 text-xs tk-text-secondary">
                    <Check className="w-3 h-3 tk-accent-primary flex-shrink-0 mt-0.5" />
                    {o}
                  </div>
                ))}
              </div>
              <a href="#" className="text-xs tk-accent-primary flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
