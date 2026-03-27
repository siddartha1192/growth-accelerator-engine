import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Unlink, Settings, BarChart3 } from 'lucide-react';

const cards = [
  {
    icon: Unlink,
    title: 'Fragmented Lead Systems',
    body: 'Leads come from multiple channels with no unified tracking or follow-up logic. Revenue leaks silently every day.',
    borderColor: 'hsl(220 100% 62%)',
  },
  {
    icon: Settings,
    title: 'Manual Operation Overload',
    body: "Every process requires human intervention. As you scale, costs balloon while quality drops. You're working harder, not smarter.",
    borderColor: 'hsl(37 91% 55%)',
  },
  {
    icon: BarChart3,
    title: 'Decisions Without Data',
    body: "Your team makes critical decisions on gut feel. Without real-time intelligence, you're flying blind in a competitive market.",
    borderColor: 'hsl(160 100% 45%)',
  },
];

export default function ProblemSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">GROWTH BLOCKERS</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4 mb-12 leading-tight">
            Your Business Has Growth Potential.
            <br />
            <span className="tk-text-secondary">Your Systems Are Limiting It.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 text-left"
              style={{ borderLeft: `3px solid ${card.borderColor}` }}
            >
              <card.icon className="w-6 h-6 mb-4" style={{ color: card.borderColor }} />
              <h3 className="font-display font-semibold text-base mb-2">{card.title}</h3>
              <p className="text-sm tk-text-secondary leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-display font-bold text-xl md:text-2xl leading-relaxed"
        >
          "Most ₹5–50 Cr businesses are leaving{' '}
          <span className="text-gradient-blue">₹1–4 Cr on the table annually</span>
          {' '}— not due to lack of effort, but lack of systems."
        </motion.p>
      </div>
    </section>
  );
}
