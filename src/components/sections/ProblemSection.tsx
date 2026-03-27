import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const blockers = [
  {
    num: '01',
    title: 'Fragmented\nLead Systems',
    body: 'Leads come from multiple channels with no unified tracking or follow-up logic. Revenue leaks silently every day.',
  },
  {
    num: '02',
    title: 'Manual Operation\nOverload',
    body: "Every process requires human intervention. As you scale, costs balloon while quality drops. You're working harder, not smarter.",
  },
  {
    num: '03',
    title: 'Decisions\nWithout Data',
    body: "Your team makes critical decisions on gut feel. Without real-time intelligence, you're flying blind in a competitive market.",
  },
];

function ScrollItem({
  num, title, body, enterStart, enterEnd, exitStart, exitEnd, progress,
}: {
  num: string; title: string; body: string;
  enterStart: number; enterEnd: number;
  exitStart: number; exitEnd: number;
  progress: any;
}) {
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    ['60px', '0px', '0px', '-60px']
  );
  const scale = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.94, 1, 1, 1.03]
  );
  const numX = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    ['-30px', '0px', '0px', '30px']
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20"
    >
      {/* Number — slides from left */}
      <motion.span
        style={{ x: numX }}
        className="font-mono text-[11px] tracking-[0.35em] uppercase mb-6"
        style={{ color: 'hsl(230 95% 65%)', x: numX } as any}
      >
        {num} / 03
      </motion.span>

      {/* Giant title */}
      <h2
        className="font-display font-extrabold leading-[0.92] tracking-tight mb-8 text-white"
        style={{ fontSize: 'clamp(3.2rem, 8vw, 7rem)', whiteSpace: 'pre-line' }}
      >
        {title}
      </h2>

      {/* Accent rule */}
      <motion.div
        className="h-px mb-8"
        style={{
          width: useTransform(progress, [enterStart, enterEnd], ['0px', '80px']),
          background: 'linear-gradient(90deg, hsl(185 100% 55%), hsl(230 95% 65%), hsl(185 100% 55%))',
        }}
      />

      {/* Body */}
      <p
        className="text-lg md:text-xl leading-relaxed max-w-[520px] text-center"
        style={{ color: 'hsl(218 18% 65%)' }}
      >
        {body}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Background image moves slowest
  const bgY = useTransform(smooth, [0, 1], ['0%', '22%']);

  // Per-item enter/exit windows — evenly spaced across 0→1
  // 3 items: each gets 1/3 of the scroll. Enter in first 40%, exit in last 40%
  const windows = [
    { enterStart: 0,    enterEnd: 0.12, exitStart: 0.22, exitEnd: 0.34 },
    { enterStart: 0.33, enterEnd: 0.45, exitStart: 0.55, exitEnd: 0.67 },
    { enterStart: 0.66, enterEnd: 0.78, exitStart: 0.92, exitEnd: 1.0  },
  ];

  return (
    // 300vh — gives enough scroll room for all 3 items
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>

      {/* ── Sticky viewport — sits below the nav (top-16 = 64px) ── */}
      <div className="sticky top-16 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <motion.div className="absolute inset-[-15%]" style={{ y: bgY }}>
            <img
              src="/pics/tech6.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </motion.div>

          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'hsl(222 50% 5% / 0.72)' }} />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 55%, hsl(230 95% 65% / 0.08) 0%, transparent 65%)' }}
          />

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[hsl(222_50%_6%)] to-transparent" />
        </div>

        {/* Growth Blockers bar — top of content area, right below nav */}
        <div
          className="absolute top-0 inset-x-0 z-20 flex items-center justify-center h-11"
          style={{
            background: 'hsl(222 50% 5% / 0.80)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: 'hsl(230 95% 65%)' }} />
            <span
              className="font-mono text-[11px] tracking-[0.3em] uppercase font-medium"
              style={{ color: 'hsl(230 95% 72%)' }}
            >
              Growth Blockers
            </span>
            <div className="w-6 h-px" style={{ background: 'hsl(230 95% 65%)' }} />
          </div>
        </div>

        {/* Scroll progress bar — right edge */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {blockers.map((_, i) => {
            const w = windows[i];
            const dotOp = useTransform(
              smooth,
              [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
              [0.25, 1, 1, 0.25]
            );
            const dotScale = useTransform(
              smooth,
              [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
              [1, 1.5, 1.5, 1]
            );
            return (
              <motion.div
                key={i}
                style={{ opacity: dotOp, scale: dotScale }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'hsl(230 95% 65%)', opacity: dotOp, scale: dotScale } as any}
              />
            );
          })}
        </div>

        {/* Text items — stacked below the bar (pt-11 = 44px bar height) */}
        <div className="relative z-10 h-full pt-11">
          {blockers.map((b, i) => (
            <ScrollItem
              key={b.num}
              {...b}
              {...windows[i]}
              progress={smooth}
            />
          ))}
        </div>

        {/* Pull quote — appears at the very end of scroll */}
        <motion.div
          style={{
            opacity: useTransform(smooth, [0.88, 1], [0, 1]),
            y: useTransform(smooth, [0.88, 1], ['20px', '0px']),
          }}
          className="absolute bottom-12 left-8 md:left-20 lg:left-32 right-8 md:right-20 z-20"
        >
          <p className="font-display font-semibold text-2xl md:text-4xl text-center leading-snug" style={{ color: 'hsl(218 18% 55%)' }}>
            "Most ₹5–50 Cr businesses are leaving{' '}
            <span style={{
              background: 'linear-gradient(90deg, hsl(230 95% 70%), hsl(185 100% 55%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ₹1–4 Cr on the table annually
            </span>
            {' '}— not due to lack of effort, but lack of systems."
          </p>
        </motion.div>
      </div>

    </section>
  );
}
