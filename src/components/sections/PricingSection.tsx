import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Check } from 'lucide-react';

const tiers = [
  {
    badge: 'START HERE',
    badgeColor: 'hsl(220 100% 62%)',
    title: 'AI Growth Audit',
    price: '₹25K – ₹75K',
    subtitle: 'Your complete growth blueprint',
    features: ['Deep business analysis (AI-powered)', 'Revenue leakage identification', 'Systems gap assessment', 'Execution roadmap (30/60/90 days)', 'Strategy call with TekKeys consultant'],
    cta: 'Book Audit Call →',
    highlight: false,
  },
  {
    badge: 'MOST POPULAR',
    badgeColor: 'hsl(37 91% 55%)',
    title: 'Growth System Implementation',
    price: '₹2L – ₹10L',
    subtitle: 'Full system design and delivery',
    features: ['Everything in Audit', 'CRM + automation implementation', 'Lead management systems', 'Digital presence overhaul', '3-month managed delivery'],
    cta: 'Start a Project →',
    highlight: true,
  },
  {
    badge: 'ENTERPRISE',
    badgeColor: 'hsl(190 100% 50%)',
    title: 'Full Transformation',
    price: '₹15L+',
    subtitle: 'End-to-end business transformation',
    features: ['Everything in Growth System', 'AI & intelligence layer', 'Operations redesign', 'Team training & handover', 'Ongoing managed services'],
    cta: "Let's Talk →",
    highlight: false,
  },
];

export default function PricingSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 35% 9%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">THE OFFER</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4">Start With a Diagnosis. Scale With a System.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-8 flex flex-col relative ${tier.highlight ? 'ring-1' : ''}`}
              style={tier.highlight ? { ringColor: 'hsl(37 91% 55% / 0.4)', boxShadow: '0 0 40px hsl(37 91% 55% / 0.1)' } : {}}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider mb-4 w-fit"
                style={{ backgroundColor: `${tier.badgeColor}20`, color: tier.badgeColor }}
              >
                {tier.badge}
              </span>
              <h3 className="font-display font-bold text-lg">{tier.title}</h3>
              <div className="font-mono text-2xl font-bold mt-2 mb-1 text-foreground">{tier.price}</div>
              <p className="text-xs tk-text-secondary mb-6">{tier.subtitle}</p>
              <div className="flex-1 flex flex-col gap-3 mb-6">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm tk-text-secondary">
                    <Check className="w-4 h-4 tk-accent-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
              <button
                className="w-full py-3 rounded-xl text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={
                  tier.highlight
                    ? { background: `linear-gradient(135deg, hsl(37 91% 55%), hsl(37 91% 45%))`, color: 'hsl(222 50% 6%)' }
                    : { backgroundColor: 'hsl(220 100% 62%)', color: 'hsl(220 50% 96%)' }
                }
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs tk-text-muted mt-8">All engagements begin with a no-obligation strategy call</p>
      </div>
    </section>
  );
}
