import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Sparkles, Lock, Phone, Check as CheckIcon } from 'lucide-react';

export default function CTASection() {
  const { ref, isInView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', form);
  };

  return (
    <section id="cta" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      {/* Gradient blobs */}
      <div className="gradient-mesh-blob w-[400px] h-[400px] -left-40 top-20" style={{ background: 'hsl(220 100% 62% / 0.1)', filter: 'blur(120px)' }} />
      <div className="gradient-mesh-blob w-[300px] h-[300px] -right-20 bottom-20" style={{ background: 'hsl(190 100% 50% / 0.08)', filter: 'blur(100px)' }} />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-16 text-center rounded-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ border: '1px solid hsl(37 91% 55% / 0.3)', backgroundColor: 'hsl(37 91% 55% / 0.1)', color: 'hsl(37 91% 55%)' }}>
            <Sparkles className="w-3 h-3" />
            Limited audit slots available each week
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-4 leading-tight">
            Ready to See Exactly<br />
            <span className="text-gradient-blue">Where You're Losing Revenue?</span>
          </h2>
          <p className="text-lg tk-text-secondary max-w-[500px] mx-auto mb-8">
            Book a free 30-minute strategy call. We'll review your diagnosis results and show you the exact systems needed to 2–3X your business.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 mb-6">
            {[
              { key: 'name', placeholder: 'Your Name', type: 'text' },
              { key: 'email', placeholder: 'Email Address', type: 'email' },
              { key: 'phone', placeholder: '🇮🇳 Phone Number', type: 'tel' },
            ].map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="h-12 px-4 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                style={{ border: '1px solid hsl(216 30% 18%)' }}
              />
            ))}
            <button type="submit" className="h-12 px-6 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform whitespace-nowrap">
              Book My Strategy Call →
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-xs tk-text-muted">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 100% Confidential</span>
            <span>✓ No spam</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> We call within 24 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
