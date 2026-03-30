import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Briefcase, Building, HeartPulse, Code, Globe } from 'lucide-react';

const industries = [
  {
    icon: Briefcase,
    title: 'Consultants & Agencies',
    desc: 'Scale client delivery with AI-powered systems',
    image: '/data/consultants and agency.jpg',
    accent: 'hsl(230 95% 65%)',
  },
  {
    icon: Building,
    title: '₹5–300Cr SMEs',
    desc: "Enterprise systems built for India's growth businesses",
    image: '/data/sme.jpg',
    accent: 'hsl(185 100% 50%)',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Clinics',
    desc: 'Automate patient acquisition and operations',
    image: '/data/clinic.jpg',
    accent: 'hsl(340 85% 62%)',
  },
  {
    icon: Code,
    title: 'SaaS & Tech Companies',
    desc: 'Build scalable GTM and retention systems',
    image: '/data/tech company.jpg',
    accent: 'hsl(270 85% 68%)',
  },
  {
    icon: Globe,
    title: 'GCC / Global Companies',
    desc: 'India operations built to global standards',
    image: '/data/Global.jpg',
    accent: 'hsl(142 70% 50%)',
  },
];

export default function IndustriesSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="industries" ref={ref} className="pt-10 pb-24 md:pt-12 md:pb-32" style={{ backgroundColor: 'hsl(222 35% 9%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">INDUSTRIES</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4">Who We Serve</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{ minHeight: '300px' }}
            >
              {/* Photo background */}
              <img
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                draggable={false}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, rgba(4,9,28,0.88) 0%, rgba(4,9,28,0.25) 45%, rgba(4,9,28,0.05) 100%)`,
                }}
              />

              {/* Accent glow at bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)` }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-4" style={{ minHeight: '300px' }}>
                {/* Icon badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${ind.accent}22`,
                    border: `1px solid ${ind.accent}55`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <ind.icon className="w-3.5 h-3.5" style={{ color: ind.accent }} />
                </div>

                <h3 className="font-display font-bold text-sm text-white mb-1 leading-snug">{ind.title}</h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
