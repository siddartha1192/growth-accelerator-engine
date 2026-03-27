import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const phases = [
  { id: 'D1', label: 'DREAM', color: 'hsl(220 100% 62%)', desc: 'Define your vision and growth targets with clarity', outcomes: ['Vision alignment workshops', 'Growth target mapping', 'Market opportunity analysis'], timeline: '2 weeks' },
  { id: 'D2', label: 'DRAW', color: 'hsl(190 100% 50%)', desc: 'Design systems, architecture, and execution blueprints', outcomes: ['Systems architecture design', 'Technology stack selection', 'Execution roadmap'], timeline: '3 weeks' },
  { id: 'D3', label: 'DELIVER', color: 'hsl(160 100% 45%)', desc: 'Implement with precision — on time, on budget', outcomes: ['Agile implementation sprints', 'Quality assurance testing', 'Phased rollout strategy'], timeline: '8–16 weeks' },
  { id: 'D4', label: 'DISRUPT', color: 'hsl(37 91% 55%)', desc: 'Continuously optimise and outpace competition', outcomes: ['Performance monitoring', 'AI-driven optimisation', 'Competitive intelligence'], timeline: 'Ongoing' },
];

const positions = [
  { cx: 200, cy: 60 },   // top
  { cx: 340, cy: 200 },  // right
  { cx: 200, cy: 340 },  // bottom
  { cx: 60, cy: 200 },   // left
];

export default function FrameworkDiagram() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="framework" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-label">4-D FRAMEWORK</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-4 mb-16">
            The TekKeys<br />Transformation Model
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Desktop SVG diagram */}
          <div className="hidden md:block relative">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {/* Connecting circle path */}
              <circle cx="200" cy="200" r="140" fill="none" stroke="hsl(220 100% 62% / 0.15)" strokeWidth="1" strokeDasharray="8 4" className="animate-[spin_30s_linear_infinite] origin-center" />

              {/* Nodes */}
              {phases.map((phase, i) => (
                <g key={phase.id} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
                  <circle cx={positions[i].cx} cy={positions[i].cy} r="40" fill={active === i ? phase.color : 'hsl(220 27% 11%)'} stroke={phase.color} strokeWidth="2" className="transition-all duration-300" />
                  <text x={positions[i].cx} y={positions[i].cy - 6} textAnchor="middle" fill={active === i ? 'hsl(222 50% 6%)' : phase.color} fontSize="12" fontFamily="JetBrains Mono" fontWeight="700">{phase.id}</text>
                  <text x={positions[i].cx} y={positions[i].cy + 10} textAnchor="middle" fill={active === i ? 'hsl(222 50% 6%)' : 'hsl(220 50% 96%)'} fontSize="9" fontFamily="Syne" fontWeight="600">{phase.label}</text>
                </g>
              ))}

              {/* Center */}
              <text x="200" y="195" textAnchor="middle" fill="hsl(220 50% 96%)" fontSize="13" fontFamily="Syne" fontWeight="700">Tek<tspan fill="hsl(220 100% 62%)">Keys</tspan></text>
              <text x="200" y="212" textAnchor="middle" fill="hsl(218 18% 62%)" fontSize="8" fontFamily="JetBrains Mono">4-D Framework</text>
            </svg>

            {/* Tooltip */}
            {active !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-1/2 left-1/2 translate-x-8 -translate-y-1/2 glass-card p-4 w-56 text-left z-10"
              >
                <h4 className="font-display font-bold text-sm mb-1" style={{ color: phases[active].color }}>{phases[active].label}</h4>
                <p className="text-xs tk-text-secondary mb-2">{phases[active].desc}</p>
                {phases[active].outcomes.map((o) => (
                  <div key={o} className="text-xs tk-text-muted">• {o}</div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {phases.map((phase) => (
              <div key={phase.id} className="glass-card p-4 text-left" style={{ borderTop: `2px solid ${phase.color}` }}>
                <span className="font-mono text-xs" style={{ color: phase.color }}>{phase.id}</span>
                <h4 className="font-display font-bold text-sm mt-1">{phase.label}</h4>
                <p className="text-xs tk-text-secondary mt-1">{phase.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-[700px]">
            {phases.map((phase) => (
              <div key={phase.id} className="text-center">
                <span className="text-xs font-mono" style={{ color: phase.color }}>{phase.label}</span>
                <span className="text-xs tk-text-muted"> → </span>
                <span className="text-xs font-mono text-foreground">{phase.timeline}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
