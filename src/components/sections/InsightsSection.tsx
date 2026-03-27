import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Clock, Search, X } from 'lucide-react';

const articles = [
  {
    category: 'GROWTH SYSTEMS',
    title: "Why 80% of Indian SMEs Can't Scale Past ₹25Cr (And the Systems Fix)",
    teaser: 'The hidden infrastructure gap that keeps mid-size businesses stuck — and the 3-step framework to break through.',
    readTime: '6 min',
    tags: ['growth', 'systems', 'SME', 'scale'],
  },
  {
    category: 'AI AUTOMATION',
    title: 'How AI Automation Cut Operational Costs by 70% for a ₹40Cr Manufacturer',
    teaser: 'A detailed breakdown of how intelligent workflow automation transformed a traditional manufacturing business.',
    readTime: '8 min',
    tags: ['AI', 'automation', 'manufacturing', 'cost'],
  },
  {
    category: 'STRATEGY',
    title: 'The 4-D Framework: How TekKeys Approaches Business Transformation',
    teaser: 'Dream, Draw, Deliver, Disrupt — the methodology behind every successful TekKeys engagement.',
    readTime: '5 min',
    tags: ['strategy', 'framework', 'transformation'],
  },
  {
    category: 'DIGITAL INFRA',
    title: 'Building a ₹100Cr Revenue Engine: The Tech Stack That Scales',
    teaser: 'From CRM to ERP to custom dashboards — the digital backbone every ambitious business needs before hitting the next milestone.',
    readTime: '7 min',
    tags: ['infrastructure', 'tech', 'digital', 'scale'],
  },
  {
    category: 'LEADERSHIP',
    title: "The Founder's Bottleneck: Why You're the Biggest Risk to Growth",
    teaser: 'Identifying and systematically eliminating founder-dependency at every stage of the business lifecycle.',
    readTime: '4 min',
    tags: ['founder', 'leadership', 'delegation', 'growth'],
  },
];

const CATEGORIES = ['ALL', 'GROWTH SYSTEMS', 'AI AUTOMATION', 'STRATEGY', 'DIGITAL INFRA', 'LEADERSHIP'];

export default function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  /* ── Scroll-driven transforms ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Heading parallax — moves up slightly as we scroll through
  const headingY   = useTransform(smoothProgress, [0, 1], [60, -60]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const headingScale   = useTransform(smoothProgress, [0, 0.15], [0.92, 1]);

  // Sub-text lags behind heading
  const subY       = useTransform(smoothProgress, [0, 1], [90, -30]);
  const subOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.85, 1], [0, 1, 1, 0]);

  // Background image subtle parallax
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  /* ── Filter logic ── */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return articles.filter((a) => {
      const matchCat = activeCategory === 'ALL' || a.category === activeCategory;
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.teaser.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Dynamic background ── */}
      <div className="absolute inset-0 z-0">
        {/* Real photo with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
        >
          <img
            src="/pics/tech1.jpg"
            alt=""
            className="w-full h-full object-cover object-center scale-110"
            draggable={false}
          />
        </motion.div>

        {/* Heavy dark overlay — makes it "dynamic black" not "simple black" */}
        <div className="absolute inset-0 bg-[#00000096]" />

        {/* Animated gradient blobs */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 15% 60%, hsl(230 95% 65% / 0.18) 0%, transparent 70%),' +
              'radial-gradient(ellipse 40% 50% at 80% 20%, hsl(185 100% 55% / 0.12) 0%, transparent 65%),' +
              'radial-gradient(ellipse 35% 40% at 50% 90%, hsl(270 85% 65% / 0.10) 0%, transparent 60%)',
            animation: 'blobDrift 12s ease-in-out infinite alternate',
          }}
        />

        {/* Fine grain noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px',
          }}
        />

        {/* Bottom fade to site bg */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(222_35%_9%)] to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-28">

        {/* Split layout: left text / right search */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">

          {/* LEFT — animated heading block */}
          <div className="space-y-6">
            <motion.span
              className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase"
              style={{
                color: 'hsl(185 100% 55%)',
                opacity: headingOpacity as any,
              }}
            >
              Intelligence Hub
            </motion.span>

            <motion.h2
              style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
              className="font-display font-extrabold text-4xl md:text-6xl leading-[1.0] tracking-tight"
            >
              <span className="block text-white">TekKeys</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(100deg, hsl(230 95% 70%), hsl(185 100% 55%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Intelligence
              </span>
            </motion.h2>

            <motion.p
              style={{ y: subY, opacity: subOpacity }}
              className="text-[hsl(218_18%_70%)] text-lg leading-relaxed max-w-[480px]"
            >
              Frameworks, case breakdowns, and growth thinking for ambitious Indian businesses ready to break their next ceiling.
            </motion.p>

            <motion.div
              style={{ opacity: subOpacity, y: subY }}
              className="flex items-center gap-3 pt-2"
            >
              <div
                className="h-px flex-1 max-w-[60px]"
                style={{ background: 'linear-gradient(90deg, hsl(230 95% 65%), transparent)' }}
              />
              <span className="text-[11px] font-mono tracking-widest text-[hsl(218_18%_50%)] uppercase">
                {articles.length} Articles
              </span>
            </motion.div>
          </div>

          {/* RIGHT — search panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4"
          >
            {/* Search input */}
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors"
                style={{ color: 'hsl(218 18% 50%)' }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights…"
                className="w-full pl-11 pr-10 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'hsl(220 30% 9% / 0.85)',
                  border: '1px solid hsl(216 30% 22%)',
                  color: 'hsl(224 100% 97%)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: query
                    ? '0 0 0 2px hsl(230 95% 65% / 0.35), inset 0 1px 0 hsl(220 30% 25% / 0.4)'
                    : '0 0 0 0px transparent, inset 0 1px 0 hsl(220 30% 25% / 0.4)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid hsl(230 95% 65% / 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px hsl(230 95% 65% / 0.18), inset 0 1px 0 hsl(220 30% 25% / 0.4)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid hsl(216 30% 22%)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 0 hsl(220 30% 25% / 0.4)';
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                  style={
                    activeCategory === cat
                      ? {
                          background: 'hsl(230 95% 65%)',
                          color: '#fff',
                          boxShadow: '0 0 14px hsl(230 95% 65% / 0.45)',
                        }
                      : {
                          background: 'hsl(220 30% 12% / 0.8)',
                          color: 'hsl(218 18% 60%)',
                          border: '1px solid hsl(216 30% 20%)',
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-xs font-mono text-[hsl(218_18%_45%)]">
              {filtered.length === articles.length
                ? `All ${articles.length} insights`
                : `${filtered.length} of ${articles.length} insights`}
            </p>
          </motion.div>
        </div>

        {/* ── Article cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col p-6 rounded-2xl group cursor-pointer"
              style={{
                background: 'hsl(220 27% 10% / 0.75)',
                border: '1px solid hsl(216 30% 20%)',
                backdropFilter: 'blur(16px)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(230 95% 65% / 0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px hsl(230 95% 65% / 0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(216 30% 20%)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.2em] uppercase mb-3 self-start px-2 py-1 rounded-md"
                style={{
                  color: 'hsl(185 100% 55%)',
                  background: 'hsl(185 100% 55% / 0.1)',
                  border: '1px solid hsl(185 100% 55% / 0.2)',
                }}
              >
                {a.category}
              </span>

              <h3 className="font-display font-semibold text-[15px] leading-snug mb-3 text-white group-hover:text-[hsl(230_95%_75%)] transition-colors">
                {a.title}
              </h3>

              <p className="text-xs text-[hsl(218_18%_58%)] flex-1 mb-5 leading-relaxed">
                {a.teaser}
              </p>

              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-[hsl(218_18%_45%)]">
                  <Clock className="w-3 h-3" />
                  {a.readTime} read
                </span>
                <span
                  className="flex items-center gap-1 font-medium transition-all group-hover:gap-2"
                  style={{ color: 'hsl(230 95% 65%)' }}
                >
                  Read Article
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <p className="text-[hsl(218_18%_45%)] text-sm">No insights match your search.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('ALL'); }}
                className="mt-3 text-xs underline"
                style={{ color: 'hsl(230 95% 65%)' }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
            style={{ color: 'hsl(230 95% 65%)' }}
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes blobDrift {
          0%   { opacity: 0.4; background-position: 0% 50%; }
          50%  { opacity: 0.55; background-position: 100% 50%; }
          100% { opacity: 0.4; background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
