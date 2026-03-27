import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 500, suffix: 'Cr+', prefix: '₹', label: 'Revenue Impacted' },
  { value: 40, suffix: '+', prefix: '', label: 'Projects Delivered' },
  { value: 3, suffix: 'X', prefix: '', label: 'Avg Growth' },
  { value: 9, suffix: ' Months', prefix: '', label: 'Fastest Scale' },
];

function StatItem({ value, suffix, prefix, label }: typeof stats[0]) {
  const { count, ref } = useCountUp(value, 1500);
  return (
    <div className="text-center" ref={ref as React.Ref<HTMLDivElement>}>
      <div className="font-mono text-2xl md:text-3xl font-bold tk-accent-primary">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs tk-text-muted mt-1">{label}</div>
    </div>
  );
}

export default function TrustBar() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="tk-bg-secondary py-10 border-y" style={{ borderColor: 'hsl(216 30% 18%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <p className="text-xs tk-text-muted uppercase tracking-widest">Trusted by Growth-Stage Businesses</p>
          <div className="flex items-center gap-8">
            {['Clinic', 'Real Estate', 'SaaS', 'Manufacturing', 'Services'].map((cat) => (
              <div key={cat} className="w-20 h-8 rounded tk-bg-elevated flex items-center justify-center text-[10px] tk-text-muted opacity-40">
                {cat}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
