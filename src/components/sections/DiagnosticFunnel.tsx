import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Building, Factory, HeartPulse, Code, Store, Plus,
  Users, Megaphone, ShoppingCart, Mail, Handshake, Link2,
  ClipboardList, Database, Zap, HelpCircle,
  Frown, TrendingDown, Compass, DollarSign, AlertTriangle, Waypoints,
  Check, ArrowRight, ArrowLeft, Phone, AtSign, Globe,
} from 'lucide-react';
import {
  FunnelData, defaultFunnelData, calculateScore, estimateLeakage,
  formatRevenue, getScoreLabel, generateGaps, generateOpportunities,
} from '@/lib/funnelLogic';

const TOTAL_STEPS = 12;

const businessTypes = [
  { icon: Building,   label: 'Services / Consulting' },
  { icon: Factory,    label: 'Manufacturing / Trade' },
  { icon: HeartPulse, label: 'Healthcare / Clinics' },
  { icon: Code,       label: 'Tech / SaaS' },
  { icon: Store,      label: 'Retail / D2C' },
  { icon: Plus,       label: 'Other' },
];

const leadSources = [
  { icon: Handshake,     label: 'Referrals' },
  { icon: Users,         label: 'Sales Team' },
  { icon: Megaphone,     label: 'Digital Marketing' },
  { icon: ShoppingCart,  label: 'Marketplace' },
  { icon: Mail,          label: 'Cold Outreach' },
  { icon: Link2,         label: 'Partnerships' },
];

const conversionOptions = [
  { icon: ClipboardList, label: 'Manual follow-ups',      val: 'manual' },
  { icon: Database,      label: 'Basic CRM',              val: 'basic' },
  { icon: Zap,           label: 'Automated workflows',    val: 'automated' },
  { icon: HelpCircle,    label: 'No structured process',  val: 'none' },
];

const painOptions = [
  { icon: Frown,         label: 'Not enough leads' },
  { icon: TrendingDown,  label: 'Low conversion rates' },
  { icon: Waypoints,     label: 'Operations chaos' },
  { icon: AlertTriangle, label: "Can't scale beyond current size" },
  { icon: Compass,       label: 'No clear growth strategy' },
  { icon: DollarSign,    label: 'High costs, low margins' },
];

const toolOptions      = ['CRM', 'WhatsApp Business', 'ERP', 'Analytics Dashboard', 'AI Tools', 'None of the above'];
const customerOptions  = ['Mid-size Service Businesses', 'Clinics & Hospitals', 'Retail Brands', 'Education Institutions', 'Tech Companies', 'Real Estate Firms'];
const techOptions      = ['None', 'Basic', 'Moderate', 'Advanced', 'Full team'];

/* ── Score Gauge ─────────────────────────────────────────── */
function ScoreGauge({ score }: { score: number }) {
  const { count, ref } = useCountUp(score, 1600, false);
  const R = 82;
  const circ = 2 * Math.PI * R;
  const offset = circ - (count / 100) * circ;
  const { color } = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center" ref={ref as React.Ref<HTMLDivElement>}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Background track */}
        <circle cx="100" cy="100" r={R} fill="none" stroke="hsl(216 30% 14%)" strokeWidth="10" />
        {/* Glow ring */}
        <circle cx="100" cy="100" r={R} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1.6s ease-out', filter: `drop-shadow(0 0 8px ${color}88)` }} />
        {/* Foreground arc */}
        <circle cx="100" cy="100" r={R} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1.6s ease-out' }} />
        {/* Score number */}
        <text x="100" y="88"  textAnchor="middle" fill="hsl(220 50% 96%)" fontSize="44" fontFamily="JetBrains Mono" fontWeight="700">{count}</text>
        <text x="100" y="112" textAnchor="middle" fill="hsl(218 18% 50%)" fontSize="12"  fontFamily="JetBrains Mono">/100</text>
      </svg>
      <p className="text-sm font-semibold mt-1" style={{ color }}>{getScoreLabel(score).label}</p>
      <p className="text-xs tk-text-muted mt-1 text-center max-w-[180px]">{getScoreLabel(score).subtitle}</p>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function DiagnosticFunnel() {
  const { ref: sectionRef, isInView } = useInView();
  const [step, setStep]               = useState(1);
  const [data, setData]               = useState<FunnelData>(defaultFunnelData);
  const [processing, setProcessing]   = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [contactTouched, setContactTouched] = useState(false);

  const step1Valid = data.email.trim() !== '' && data.phone.trim() !== '';

  const next = () => {
    if (step === 1 && !step1Valid) { setContactTouched(true); return; }
    if (step === 10) { setStep(11); setProcessing(true); }
    else setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };
  const prev = () => setStep(s => Math.max(s - 1, 1));

  useEffect(() => {
    if (!processing) return;
    const t = [
      setTimeout(() => setProcessingStep(1), 600),
      setTimeout(() => setProcessingStep(2), 1700),
      setTimeout(() => setProcessingStep(3), 2800),
      setTimeout(() => { setProcessing(false); setStep(12); }, 3800),
    ];
    return () => t.forEach(clearTimeout);
  }, [processing]);

  const toggle = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];

  const score      = calculateScore(data);
  const [lo, hi]   = estimateLeakage(data.currentRevenue, score);
  const gaps        = generateGaps(data);
  const opps        = generateOpportunities(data);
  const pct         = (step / TOTAL_STEPS) * 100;

  /* ── Input styles ─────────────────────────── */
  const inputCls = "w-full h-11 px-4 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:tk-text-muted transition-all";
  const inputStyle = { border: '1px solid hsl(216 30% 18%)' };

  const chipClass = (on: boolean) =>
    `px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all flex items-center gap-2 ${
      on ? 'text-primary-foreground font-medium' : 'tk-text-secondary hover:text-foreground'
    }`;
  const chipStyle = (on: boolean) => ({
    border: on ? '1px solid hsl(220 100% 62%)' : '1px solid hsl(216 30% 18%)',
    backgroundColor: on ? 'hsl(220 100% 62%)' : 'hsl(220 25% 16% / 0.45)',
  });

  const card = "glass-card p-8 md:p-10 rounded-3xl max-w-[660px] mx-auto";
  const qTitle = "font-display font-semibold text-xl md:text-2xl mb-6";

  /* ── Steps ───────────────────────────────── */
  const renderStep = () => {
    switch (step) {

      /* ── Step 1: Business type + contact ── */
      case 1:
        return (
          <div className={card}>
            <h3 className={qTitle}>What best describes your business?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {businessTypes.map(bt => (
                <button key={bt.label}
                  onClick={() => setData({ ...data, businessType: bt.label })}
                  className={chipClass(data.businessType === bt.label)}
                  style={chipStyle(data.businessType === bt.label)}>
                  <bt.icon className="w-4 h-4 flex-shrink-0" /> {bt.label}
                </button>
              ))}
            </div>

            {/* Contact capture */}
            <div className="space-y-3 pt-2">
              <p className="text-xs tk-text-muted mb-1">
                We'll send your personalised AI Growth Report to:
              </p>

              {/* Email */}
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 tk-text-muted pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email address *"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  className={`${inputCls} pl-10`}
                  style={{
                    border: contactTouched && !data.email.trim()
                      ? '1px solid hsl(0 84% 60%)'
                      : inputStyle.border,
                  }}
                />
                {contactTouched && !data.email.trim() && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'hsl(0 84% 60%)' }}>
                    <AlertTriangle className="w-3 h-3" /> Email is required
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 tk-text-muted pointer-events-none" />
                <input
                  type="tel"
                  placeholder="Phone number *"
                  value={data.phone}
                  onChange={e => setData({ ...data, phone: e.target.value })}
                  className={`${inputCls} pl-10`}
                  style={{
                    border: contactTouched && !data.phone.trim()
                      ? '1px solid hsl(0 84% 60%)'
                      : inputStyle.border,
                  }}
                />
                {contactTouched && !data.phone.trim() && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'hsl(0 84% 60%)' }}>
                    <AlertTriangle className="w-3 h-3" /> Phone number is required
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 tk-text-muted pointer-events-none" />
                <input
                  type="url"
                  placeholder="Website URL (optional)"
                  value={data.websiteUrl}
                  onChange={e => setData({ ...data, websiteUrl: e.target.value })}
                  className={`${inputCls} pl-10`}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        );

      /* ── Step 2: Revenue sliders ── */
      case 2: {
        const revenueError = data.targetRevenue <= data.currentRevenue;
        return (
          <div className={card}>
            <h3 className={qTitle}>Where are you today — and where do you want to go?</h3>

            {/* Current revenue */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-xs tk-text-secondary">Current Monthly Revenue</span>
                <span className="font-mono text-lg font-bold tk-accent-primary">{formatRevenue(data.currentRevenue)}</span>
              </div>
              <input type="range" min="10" max="2500" value={data.currentRevenue}
                onChange={e => {
                  const cur = Number(e.target.value);
                  // Push target up if it would become equal or lower
                  const tar = data.targetRevenue <= cur ? cur + 50 : data.targetRevenue;
                  setData({ ...data, currentRevenue: cur, targetRevenue: tar });
                }}
                className="w-full accent-[hsl(220,100%,62%)]" />
            </div>

            {/* Target revenue */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs tk-text-secondary">12-Month Revenue Target</span>
                <span className="font-mono text-lg font-bold tk-accent-green">{formatRevenue(data.targetRevenue)}</span>
              </div>
              <input type="range" min="10" max="2500" value={data.targetRevenue}
                onChange={e => setData({ ...data, targetRevenue: Number(e.target.value) })}
                className="w-full accent-[hsl(160,100%,45%)]" />
            </div>

            {/* Validation warning */}
            {revenueError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs mt-3 flex items-center gap-1.5"
                style={{ color: 'hsl(0 84% 60%)' }}
              >
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                Target must be higher than current revenue — slide it up to set your growth goal.
              </motion.p>
            )}

            {/* Growth multiplier preview */}
            {!revenueError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ backgroundColor: 'hsl(160 100% 45% / 0.07)', border: '1px solid hsl(160 100% 45% / 0.18)' }}
              >
                <span className="text-xs tk-text-secondary">Growth multiple</span>
                <span className="font-mono font-bold text-base tk-accent-green">
                  {(data.targetRevenue / data.currentRevenue).toFixed(1)}× in 12 months
                </span>
              </motion.div>
            )}

            <p className="text-xs tk-text-muted italic mt-5 text-center">
              "A ₹12Cr services firm reached ₹36Cr in 11 months using TekKeys systems."
            </p>
          </div>
        );
      }

      /* ── Step 3: Lead sources ── */
      case 3:
        return (
          <div className={card}>
            <h3 className={qTitle}>How do you currently generate leads?</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {leadSources.map(ls => (
                <button key={ls.label}
                  onClick={() => setData({ ...data, leadSources: toggle(data.leadSources, ls.label) })}
                  className={chipClass(data.leadSources.includes(ls.label))}
                  style={chipStyle(data.leadSources.includes(ls.label))}>
                  <ls.icon className="w-4 h-4" /> {ls.label}
                </button>
              ))}
            </div>
            {data.leadSources.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <label className="text-xs tk-text-secondary block mb-2">Roughly how many leads per month?</label>
                <input type="number" value={data.monthlyLeads || ''}
                  onChange={e => setData({ ...data, monthlyLeads: Number(e.target.value) })}
                  className={inputCls} style={inputStyle} placeholder="e.g. 50" />
              </motion.div>
            )}
          </div>
        );

      /* ── Step 4: Conversion system ── */
      case 4:
        return (
          <div className={card}>
            <h3 className={qTitle}>How do you convert leads into customers?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conversionOptions.map(co => (
                <button key={co.label}
                  onClick={() => setData({ ...data, conversionSystem: co.val })}
                  className={chipClass(data.conversionSystem === co.val)}
                  style={chipStyle(data.conversionSystem === co.val)}>
                  <co.icon className="w-4 h-4" /> {co.label}
                </button>
              ))}
            </div>
          </div>
        );

      /* ── Step 5: Ops maturity ── */
      case 5:
        return (
          <div className={card}>
            <h3 className={qTitle}>How much of your operations are manual?</h3>
            <div className="flex items-center justify-between gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n}
                  onClick={() => setData({ ...data, operationsMaturity: n })}
                  className={`flex-1 h-12 rounded-xl text-sm font-mono transition-all ${data.operationsMaturity === n ? 'text-white font-bold' : 'tk-text-secondary'}`}
                  style={{
                    backgroundColor: data.operationsMaturity === n
                      ? n <= 2 ? 'hsl(0 84% 60%)' : n === 3 ? 'hsl(37 91% 55%)' : 'hsl(160 100% 45%)'
                      : 'hsl(220 25% 16% / 0.45)',
                    border: '1px solid hsl(216 30% 18%)',
                  }}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs tk-text-muted">
              <span>Fully Manual</span><span>Fully Automated</span>
            </div>
          </div>
        );

      /* ── Step 6: Competitors ── */
      case 6:
        return (
          <div className={card}>
            <h3 className={qTitle}>Who are your top 2–3 competitors?</h3>
            <div className="flex flex-col gap-3">
              {data.competitors.map((c, i) => (
                <input key={i} type="text" value={c}
                  onChange={e => {
                    const comp = [...data.competitors];
                    comp[i] = e.target.value;
                    setData({ ...data, competitors: comp });
                  }}
                  placeholder={`Competitor ${i + 1}`}
                  className={inputCls} style={inputStyle} />
              ))}
            </div>
            <button
              onClick={() => setData({ ...data, competitors: [...data.competitors, ''] })}
              className="text-xs tk-accent-primary mt-3 hover:underline">
              + Add more
            </button>
          </div>
        );

      /* ── Step 7: Ideal customer ── */
      case 7:
        return (
          <div className={card}>
            <h3 className={qTitle}>Who is your ideal customer?</h3>
            <div className="flex flex-wrap gap-2">
              {['Mid-size Service Businesses', 'Clinics & Hospitals', 'Retail Brands', 'Education Institutions', 'Tech Companies', 'Real Estate Firms'].map(c => (
                <button key={c}
                  onClick={() => setData({ ...data, idealCustomers: toggle(data.idealCustomers, c) })}
                  className={`px-4 py-2 rounded-full text-xs cursor-pointer transition-all ${data.idealCustomers.includes(c) ? 'text-primary-foreground' : 'tk-text-secondary'}`}
                  style={chipStyle(data.idealCustomers.includes(c))}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        );

      /* ── Step 8: Pain points ── */
      case 8:
        return (
          <div className={card}>
            <h3 className={qTitle}>Where do you feel most stuck right now?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {painOptions.map(po => (
                <button key={po.label}
                  onClick={() => setData({ ...data, painPoints: toggle(data.painPoints, po.label) })}
                  className={chipClass(data.painPoints.includes(po.label))}
                  style={chipStyle(data.painPoints.includes(po.label))}>
                  <po.icon className="w-4 h-4" /> {po.label}
                </button>
              ))}
            </div>
          </div>
        );

      /* ── Step 9: Team ── */
      case 9:
        return (
          <div className={card}>
            <h3 className={qTitle}>Tell us about your current team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Sales team size</label>
                <input type="number" value={data.salesTeamSize || ''}
                  onChange={e => setData({ ...data, salesTeamSize: Number(e.target.value) })}
                  className={inputCls} style={inputStyle} />
              </div>
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Marketing team size</label>
                <input type="number" value={data.marketingTeamSize || ''}
                  onChange={e => setData({ ...data, marketingTeamSize: Number(e.target.value) })}
                  className={inputCls} style={inputStyle} />
              </div>
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Tech/IT capability</label>
                <select value={data.techCapability}
                  onChange={e => setData({ ...data, techCapability: e.target.value })}
                  className={inputCls} style={{ ...inputStyle, backgroundColor: 'hsl(220 25% 13%)' }}>
                  <option value="">Select</option>
                  {techOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
        );

      /* ── Step 10: Tools ── */
      case 10:
        return (
          <div className={card}>
            <h3 className={qTitle}>What tools or systems do you currently use?</h3>
            <div className="flex flex-wrap gap-2">
              {toolOptions.map(t => {
                const val = t === 'None of the above' ? 'none' : t;
                return (
                  <button key={t}
                    onClick={() => setData({ ...data, toolsUsed: toggle(data.toolsUsed, val) })}
                    className={`px-4 py-2 rounded-xl text-sm cursor-pointer transition-all ${data.toolsUsed.includes(val) ? 'text-primary-foreground' : 'tk-text-secondary'}`}
                    style={chipStyle(data.toolsUsed.includes(val))}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        );

      /* ── Step 11: Processing ── */
      case 11:
        return (
          <div className={`${card} text-center`}>
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, hsl(220 100% 62% / 0.2), hsl(190 100% 50% / 0.15))' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}>
              <span className="font-display font-bold text-lg tk-accent-primary">TK</span>
            </motion.div>

            <h3 className="font-display font-semibold text-lg mb-6">Building Your AI Growth Blueprint…</h3>

            <div className="space-y-4">
              {[
                'Analysing your growth architecture…',
                'Identifying revenue leakage points…',
                'Calibrating AI recommendations…',
              ].map((msg, i) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0, x: -12 }}
                  animate={processingStep > i ? { opacity: 1, x: 0 } : { opacity: 0.25, x: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 text-sm">
                  {processingStep > i
                    ? <Check className="w-4 h-4 tk-accent-green flex-shrink-0" />
                    : <span className="w-4 h-4 rounded-full border border-muted flex-shrink-0" />}
                  <span className={processingStep > i ? 'text-foreground' : 'tk-text-muted'}>{msg}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(216 30% 18%)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.8, ease: 'linear' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(220 100% 62%), hsl(190 100% 50%), hsl(160 100% 45%))' }}
              />
            </div>
          </div>
        );

      /* ── Step 12: Results ── */
      case 12:
        return (
          <div className="glass-card p-8 md:p-10 rounded-3xl max-w-[820px] mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="section-label">AI GROWTH REPORT</span>
              {data.businessType && (
                <p className="text-xs tk-text-muted mt-2">
                  {data.businessType} · {data.email || 'your business'}
                </p>
              )}
            </div>

            {/* Score + Revenue leakage side by side on desktop */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="flex-shrink-0">
                <ScoreGauge score={score} />
              </div>

              <div className="flex-1 w-full space-y-4">
                {/* Revenue leakage */}
                <div className="p-5 rounded-2xl" style={{ backgroundColor: 'hsl(0 84% 60% / 0.07)', borderLeft: '4px solid hsl(0 84% 60%)' }}>
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <span>⚠</span>
                    <span>Estimated Annual Revenue Leakage</span>
                  </div>
                  <div className="font-mono text-2xl font-bold" style={{ color: 'hsl(0 84% 60%)' }}>
                    {formatRevenue(lo)} — {formatRevenue(hi)}
                  </div>
                  <p className="text-xs tk-text-muted mt-1.5">
                    Based on your current systems maturity and business profile
                  </p>
                </div>

                {/* Growth multiplier */}
                {data.targetRevenue > data.currentRevenue && (
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: 'hsl(160 100% 45% / 0.07)', borderLeft: '4px solid hsl(160 100% 45%)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Target Growth Multiple</span>
                      <span className="font-mono font-bold text-lg tk-accent-green">
                        {(data.targetRevenue / data.currentRevenue).toFixed(1)}×
                      </span>
                    </div>
                    <p className="text-xs tk-text-muted mt-1">
                      {formatRevenue(data.currentRevenue)} → {formatRevenue(data.targetRevenue)} in 12 months
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Gaps Identified */}
            <div className="mb-6">
              <h4 className="text-xs font-mono tk-text-muted uppercase tracking-widest mb-3">Gaps Identified</h4>
              <div className="space-y-2">
                {gaps.map(({ label, impact }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-3.5 rounded-xl"
                    style={{ backgroundColor: 'hsl(37 91% 55% / 0.06)' }}>
                    <span className="text-sm flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 tk-accent-gold flex-shrink-0" /> {label}
                    </span>
                    <span className="text-xs font-mono tk-accent-gold ml-3 flex-shrink-0">{impact}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Growth Opportunities */}
            <div className="mb-6">
              <h4 className="text-xs font-mono tk-text-muted uppercase tracking-widest mb-3">Growth Opportunities</h4>
              <div className="space-y-2">
                {opps.map(({ label, result }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center justify-between p-3.5 rounded-xl"
                    style={{ backgroundColor: 'hsl(160 100% 45% / 0.06)' }}>
                    <span className="text-sm flex items-center gap-2.5">
                      <Check className="w-4 h-4 tk-accent-green flex-shrink-0" /> {label}
                    </span>
                    <span className="text-xs font-mono tk-accent-green ml-3 flex-shrink-0">{result}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Priority Action Plan */}
            <div className="mb-8 p-5 rounded-2xl" style={{ backgroundColor: 'hsl(220 100% 62% / 0.05)', border: '1px solid hsl(220 100% 62% / 0.15)' }}>
              <h4 className="text-xs font-mono tk-text-muted uppercase tracking-widest mb-4">Priority Action Plan</h4>
              <div className="space-y-3">
                {[
                  { n: '01', phase: 'Week 1–2',    action: 'Strategy session with a TekKeys AI Growth Specialist' },
                  { n: '02', phase: 'Day 30',       action: 'Deploy lead capture automation + CRM integration' },
                  { n: '03', phase: 'Day 90',       action: 'Full AI Growth Engine activation with live dashboards' },
                ].map(({ n, phase, action }) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold tk-accent-primary mt-0.5 flex-shrink-0">{n}</span>
                    <div>
                      <span className="text-xs font-mono tk-text-muted">{phase}</span>
                      <p className="text-sm tk-text-secondary">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                className="w-full py-4 rounded-2xl text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, hsl(220 100% 62%), hsl(190 100% 50%))', color: 'hsl(220 50% 96%)' }}>
                Book My Free AI Strategy Session <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="w-full py-3 rounded-2xl text-sm tk-text-secondary hover:text-foreground transition-colors"
                style={{ border: '1px solid hsl(216 30% 18%)' }}>
                Download Full Growth Report (PDF)
              </button>
            </div>

            {data.email && (
              <p className="text-xs tk-text-muted text-center mt-4">
                Report will be sent to <span className="tk-accent-primary">{data.email}</span>
              </p>
            )}
          </div>
        );

      default: return null;
    }
  };

  return (
    <section
      id="diagnosis"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#080e1f' }}
    >
      {/* ── Layer 1: Full-bleed background image ── */}
      <img
        src="/pics/tech4.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ opacity: 0.45, filter: 'brightness(0.55) saturate(0.75) hue-rotate(200deg)' }}
      />

      {/* ── Layer 2: Thin dark-blue veil so text stays readable ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(6, 10, 28, 0.62)' }}
      />

      {/* ── Layer 3: Corner accent — tech2 top-left ── */}
      <div className="absolute top-0 left-0 w-[520px] h-[340px] overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at 0% 0%, white 20%, transparent 68%)',
          maskImage:        'radial-gradient(ellipse at 0% 0%, white 20%, transparent 68%)',
        }}
      >
        <img src="/pics/tech2.jpg" alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55, filter: 'brightness(0.5) saturate(0.65) hue-rotate(200deg)' }}
        />
      </div>

      {/* ── Layer 4: Corner accent — tech6 bottom-right ── */}
      <div className="absolute bottom-0 right-0 w-[520px] h-[340px] overflow-hidden pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at 100% 100%, white 20%, transparent 68%)',
          maskImage:        'radial-gradient(ellipse at 100% 100%, white 20%, transparent 68%)',
        }}
      >
        <img src="/pics/tech6.jpg" alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55, filter: 'brightness(0.5) saturate(0.65) hue-rotate(200deg)' }}
        />
      </div>

      {/* ── Layer 5: Side strip — tech1 left edge (desktop) ── */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-56 h-[480px] overflow-hidden pointer-events-none hidden lg:block"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at 0% 50%, white 10%, transparent 72%)',
          maskImage:        'radial-gradient(ellipse at 0% 50%, white 10%, transparent 72%)',
        }}
      >
        <img src="/pics/tech1.jpg" alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45, filter: 'brightness(0.5) saturate(0.65) hue-rotate(200deg)' }}
        />
      </div>

      {/* ── Layer 6: Side strip — tech5 right edge (desktop) ── */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-56 h-[480px] overflow-hidden pointer-events-none hidden lg:block"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at 100% 50%, white 10%, transparent 72%)',
          maskImage:        'radial-gradient(ellipse at 100% 50%, white 10%, transparent 72%)',
        }}
      >
        <img src="/pics/tech5.jpg" alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45, filter: 'brightness(0.5) saturate(0.65) hue-rotate(200deg)' }}
        />
      </div>

      {/* ── Layer 7: Subtle dot matrix ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,155,255,0.14) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Layer 8: Blue ambient glows ── */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 480, height: 480, bottom: '-12%', right: '-8%', background: 'radial-gradient(circle, rgba(0,180,230,0.09) 0%, transparent 65%)' }}
        animate={{ scale: [1.15, 1, 1.15] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Layer 9: Edge fades into adjacent sections ── */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #080e1f, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080e1f, transparent)' }} />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* Scroll anchor — plain div so it's in the DOM immediately on navigation */}
        <div id="ai-growth-engine" style={{ scrollMarginTop: '64px' }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">AI GROWTH ENGINE</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-4">
            Your Personalised<br />
            <span className="text-gradient-blue">Growth Blueprint Starts Here</span>
          </h2>
          <p className="tk-text-secondary text-sm max-w-md mx-auto mt-4">
            Answer a few questions and our AI will produce a full diagnostic report — free, instant, no fluff.
          </p>
        </motion.div>

        {/* Progress bar */}
        {step < 12 && (
          <div className="max-w-[660px] mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs tk-text-muted">Step {step} of {TOTAL_STEPS}</span>
              <span className="font-mono text-xs tk-text-muted">{Math.round(pct)}% complete</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(216 30% 18%)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, hsl(220 100% 62%), hsl(190 100% 50%))' }}
              />
            </div>
          </div>
        )}

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.28 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        {step < 11 && (
          <div className="flex justify-center gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={prev}
                className="px-5 py-2.5 rounded-xl text-sm tk-text-secondary hover:text-foreground transition-colors flex items-center gap-2"
                style={{ border: '1px solid hsl(216 30% 18%)' }}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={next}
              disabled={(step === 1 && contactTouched && !step1Valid) || (step === 2 && data.targetRevenue <= data.currentRevenue)}
              className="px-7 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">
              {step === 10 ? 'Analyse My Business' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Re-run */}
        {step === 12 && (
          <div className="text-center mt-6">
            <button
              onClick={() => { setStep(1); setData(defaultFunnelData); setProcessingStep(0); }}
              className="text-xs tk-text-muted hover:tk-text-secondary transition-colors underline underline-offset-2">
              Start over
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
