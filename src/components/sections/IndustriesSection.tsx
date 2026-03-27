import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Briefcase, Building, HeartPulse, Code, Globe } from 'lucide-react';

const industries = [
  { icon: Briefcase, title: 'Consultants & Agencies', desc: 'Scale client delivery with AI-powered systems' },
  { icon: Building, title: '₹5–300Cr SMEs', desc: "Enterprise systems built for India's growth businesses" },
  { icon: HeartPulse, title: 'Healthcare & Clinics', desc: 'Automate patient acquisition and operations' },
  { icon: Code, title: 'SaaS & Tech Companies', desc: 'Build scalable GTM and retention systems' },
  { icon: Globe, title: 'GCC / Global Companies', desc: 'India operations built to global standards' },
];

export default function IndustriesSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="industries" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 35% 9%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="section-label">INDUSTRIES</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4">Who We Serve</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 group"
              style={{ borderTop: '2px solid hsl(220 100% 62% / 0.4)' }}
            >
              <ind.icon className="w-6 h-6 tk-accent-primary mb-4" />
              <h3 className="font-display font-bold text-sm mb-2">{ind.title}</h3>
              <p className="text-xs tk-text-secondary">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
