import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Building, Factory, HeartPulse, Code, Store, Plus,
  Users, Megaphone, ShoppingCart, Mail, Handshake, Link2,
  ClipboardList, Database, Zap, HelpCircle,
  Frown, TrendingDown, Compass, DollarSign, AlertTriangle, Waypoints,
  Check, ArrowRight, ArrowLeft
} from 'lucide-react';
import { FunnelData, defaultFunnelData, calculateScore, estimateLeakage, formatRevenue } from '@/lib/funnelLogic';

const TOTAL_STEPS = 12;

const businessTypes = [
  { icon: Building, label: 'Services / Consulting' },
  { icon: Factory, label: 'Manufacturing / Trade' },
  { icon: HeartPulse, label: 'Healthcare / Clinics' },
  { icon: Code, label: 'Tech / SaaS' },
  { icon: Store, label: 'Retail / D2C' },
  { icon: Plus, label: 'Other' },
];

const leadSources = [
  { icon: Handshake, label: 'Referrals' },
  { icon: Users, label: 'Sales Team' },
  { icon: Megaphone, label: 'Digital Marketing' },
  { icon: ShoppingCart, label: 'Marketplace' },
  { icon: Mail, label: 'Cold Outreach' },
  { icon: Link2, label: 'Partnerships' },
];

const conversionOptions = [
  { icon: ClipboardList, label: 'Manual follow-ups' },
  { icon: Database, label: 'Basic CRM' },
  { icon: Zap, label: 'Automated workflows' },
  { icon: HelpCircle, label: 'No structured process' },
];

const painOptions = [
  { icon: Frown, label: 'Not enough leads' },
  { icon: TrendingDown, label: 'Low conversion rates' },
  { icon: Waypoints, label: 'Operations chaos' },
  { icon: AlertTriangle, label: "Can't scale beyond current size" },
  { icon: Compass, label: 'No clear growth strategy' },
  { icon: DollarSign, label: 'High costs, low margins' },
];

const toolOptions = ['CRM', 'WhatsApp Business', 'ERP', 'Analytics Dashboard', 'AI Tools', 'None of the above'];
const customerOptions = ['Mid-size Service Businesses', 'Clinics & Hospitals', 'Retail Brands', 'Education Institutions', 'Tech Companies', 'Real Estate Firms'];
const techOptions = ['None', 'Basic', 'Moderate', 'Advanced', 'Full team'];

function ScoreGauge({ score }: { score: number }) {
  const { count, ref } = useCountUp(score, 1500, false);
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (count / 100) * circumference;
  const color = score > 70 ? 'hsl(160 100% 45%)' : score > 45 ? 'hsl(37 91% 55%)' : 'hsl(0 84% 60%)';

  return (
    <div className="flex flex-col items-center" ref={ref as React.Ref<HTMLDivElement>}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(216 30% 18%)" strokeWidth="8" />
        <circle
          cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 100 100)"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        <text x="100" y="90" textAnchor="middle" fill="hsl(220 50% 96%)" fontSize="40" fontFamily="JetBrains Mono" fontWeight="700">{count}</text>
        <text x="100" y="115" textAnchor="middle" fill="hsl(218 18% 62%)" fontSize="12" fontFamily="JetBrains Mono">/100</text>
      </svg>
      <span className="text-sm tk-text-secondary mt-2">Growth Efficiency Rating</span>
    </div>
  );
}

export default function DiagnosticFunnel() {
  const { ref: sectionRef, isInView } = useInView();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(defaultFunnelData);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const next = () => {
    if (step === 10) {
      setStep(11);
      setProcessing(true);
    } else {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  // Processing simulation
  useEffect(() => {
    if (!processing) return;
    const timers = [
      setTimeout(() => setProcessingStep(1), 500),
      setTimeout(() => setProcessingStep(2), 1500),
      setTimeout(() => setProcessingStep(3), 2500),
      setTimeout(() => { setProcessing(false); setStep(12); }, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [processing]);

  const toggle = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const score = calculateScore(data);
  const [leakLow, leakHigh] = estimateLeakage(data.currentRevenue, score);

  const progressPercent = (step / TOTAL_STEPS) * 100;

  const renderStep = () => {
    const cardClass = "glass-card p-8 md:p-10 rounded-3xl max-w-[640px] mx-auto";
    const questionClass = "font-display font-semibold text-xl md:text-2xl mb-6";
    const chipClass = (selected: boolean) =>
      `px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all flex items-center gap-2 ${
        selected
          ? 'bg-primary text-primary-foreground'
          : 'tk-text-secondary hover:text-foreground'
      }`;
    const chipStyle = (selected: boolean) => ({
      border: selected ? '1px solid hsl(220 100% 62%)' : '1px solid hsl(216 30% 18%)',
      backgroundColor: selected ? 'hsl(220 100% 62%)' : 'hsl(220 25% 16% / 0.4)',
    });

    switch (step) {
      case 1:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>What best describes your business?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {businessTypes.map((bt) => (
                <button key={bt.label} onClick={() => setData({ ...data, businessType: bt.label })}
                  className={chipClass(data.businessType === bt.label)} style={chipStyle(data.businessType === bt.label)}>
                  <bt.icon className="w-4 h-4" /> {bt.label}
                </button>
              ))}
            </div>
            <input
              type="url" placeholder="Website URL (optional)" value={data.websiteUrl}
              onChange={(e) => setData({ ...data, websiteUrl: e.target.value })}
              className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              style={{ border: '1px solid hsl(216 30% 18%)' }}
            />
          </div>
        );
      case 2:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>Where are you today — and where do you want to go?</h3>
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-xs tk-text-secondary">Current Monthly Revenue</span>
                <span className="font-mono text-lg font-bold tk-accent-primary">{formatRevenue(data.currentRevenue)}</span>
              </div>
              <input type="range" min="10" max="2500" value={data.currentRevenue}
                onChange={(e) => setData({ ...data, currentRevenue: Number(e.target.value) })}
                className="w-full accent-[hsl(220,100%,62%)]" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs tk-text-secondary">12-Month Revenue Target</span>
                <span className="font-mono text-lg font-bold tk-accent-green">{formatRevenue(data.targetRevenue)}</span>
              </div>
              <input type="range" min="10" max="2500" value={data.targetRevenue}
                onChange={(e) => setData({ ...data, targetRevenue: Number(e.target.value) })}
                className="w-full accent-[hsl(160,100%,45%)]" />
            </div>
            <p className="text-xs tk-text-muted italic mt-6 text-center">
              "A ₹12Cr services firm reached ₹36Cr in 11 months using TekKeys systems."
            </p>
          </div>
        );
      case 3:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>How do you currently generate leads?</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {leadSources.map((ls) => (
                <button key={ls.label} onClick={() => setData({ ...data, leadSources: toggle(data.leadSources, ls.label) })}
                  className={chipClass(data.leadSources.includes(ls.label))} style={chipStyle(data.leadSources.includes(ls.label))}>
                  <ls.icon className="w-4 h-4" /> {ls.label}
                </button>
              ))}
            </div>
            {data.leadSources.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="text-xs tk-text-secondary block mb-2">Roughly how many leads per month?</label>
                <input type="number" value={data.monthlyLeads || ''} onChange={(e) => setData({ ...data, monthlyLeads: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  style={{ border: '1px solid hsl(216 30% 18%)' }} placeholder="e.g. 50" />
              </motion.div>
            )}
          </div>
        );
      case 4:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>How do you convert leads into customers?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conversionOptions.map((co) => (
                <button key={co.label} onClick={() => setData({ ...data, conversionSystem: co.label === 'Manual follow-ups' ? 'manual' : co.label === 'No structured process' ? 'none' : co.label === 'Basic CRM' ? 'basic' : 'automated' })}
                  className={chipClass(
                    (co.label === 'Manual follow-ups' && data.conversionSystem === 'manual') ||
                    (co.label === 'No structured process' && data.conversionSystem === 'none') ||
                    (co.label === 'Basic CRM' && data.conversionSystem === 'basic') ||
                    (co.label === 'Automated workflows' && data.conversionSystem === 'automated')
                  )}
                  style={chipStyle(
                    (co.label === 'Manual follow-ups' && data.conversionSystem === 'manual') ||
                    (co.label === 'No structured process' && data.conversionSystem === 'none') ||
                    (co.label === 'Basic CRM' && data.conversionSystem === 'basic') ||
                    (co.label === 'Automated workflows' && data.conversionSystem === 'automated')
                  )}>
                  <co.icon className="w-4 h-4" /> {co.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>How much of your operations are manual?</h3>
            <div className="flex items-center justify-between gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setData({ ...data, operationsMaturity: n })}
                  className={`flex-1 h-12 rounded-xl text-sm font-mono transition-all ${data.operationsMaturity === n ? 'text-primary-foreground font-bold' : 'tk-text-secondary'}`}
                  style={{
                    backgroundColor: data.operationsMaturity === n
                      ? n <= 2 ? 'hsl(0 84% 60%)' : n === 3 ? 'hsl(37 91% 55%)' : 'hsl(160 100% 45%)'
                      : 'hsl(220 25% 16% / 0.4)',
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
      case 6:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>Who are your top 2–3 competitors?</h3>
            <div className="flex flex-col gap-3">
              {data.competitors.map((c, i) => (
                <input key={i} type="text" value={c}
                  onChange={(e) => {
                    const comp = [...data.competitors];
                    comp[i] = e.target.value;
                    setData({ ...data, competitors: comp });
                  }}
                  placeholder={`Competitor ${i + 1}`}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  style={{ border: '1px solid hsl(216 30% 18%)' }}
                />
              ))}
            </div>
            <button onClick={() => setData({ ...data, competitors: [...data.competitors, ''] })} className="text-xs tk-accent-primary mt-3">+ Add more</button>
          </div>
        );
      case 7:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>Who is your ideal customer?</h3>
            <div className="flex flex-wrap gap-2">
              {customerOptions.map((c) => (
                <button key={c} onClick={() => setData({ ...data, idealCustomers: toggle(data.idealCustomers, c) })}
                  className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all ${data.idealCustomers.includes(c) ? 'bg-primary text-primary-foreground' : 'tk-text-secondary'}`}
                  style={chipStyle(data.idealCustomers.includes(c))}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>Where do you feel most stuck right now?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {painOptions.map((po) => (
                <button key={po.label} onClick={() => setData({ ...data, painPoints: toggle(data.painPoints, po.label) })}
                  className={chipClass(data.painPoints.includes(po.label))} style={chipStyle(data.painPoints.includes(po.label))}>
                  <po.icon className="w-4 h-4" /> {po.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 9:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>Tell us about your current team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Sales team size</label>
                <input type="number" value={data.salesTeamSize || ''} onChange={(e) => setData({ ...data, salesTeamSize: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  style={{ border: '1px solid hsl(216 30% 18%)' }} />
              </div>
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Marketing team size</label>
                <input type="number" value={data.marketingTeamSize || ''} onChange={(e) => setData({ ...data, marketingTeamSize: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  style={{ border: '1px solid hsl(216 30% 18%)' }} />
              </div>
              <div>
                <label className="text-xs tk-text-secondary block mb-2">Tech/IT capability</label>
                <select value={data.techCapability} onChange={(e) => setData({ ...data, techCapability: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  style={{ border: '1px solid hsl(216 30% 18%)', backgroundColor: 'hsl(220 25% 16%)' }}>
                  <option value="">Select</option>
                  {techOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className={cardClass}>
            <h3 className={questionClass}>What tools or systems do you currently use?</h3>
            <div className="flex flex-wrap gap-2">
              {toolOptions.map((t) => (
                <button key={t} onClick={() => setData({ ...data, toolsUsed: toggle(data.toolsUsed, t === 'None of the above' ? 'none' : t) })}
                  className={`px-4 py-2 rounded-xl text-sm cursor-pointer transition-all ${data.toolsUsed.includes(t === 'None of the above' ? 'none' : t) ? 'bg-primary text-primary-foreground' : 'tk-text-secondary'}`}
                  style={chipStyle(data.toolsUsed.includes(t === 'None of the above' ? 'none' : t))}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        );
      case 11:
        return (
          <div className={`${cardClass} text-center`}>
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="font-display font-bold text-lg tk-accent-primary">TK</span>
            </div>
            <div className="space-y-3">
              {['Analysing your growth architecture...', 'Identifying revenue leakage points...', 'Building your personalised roadmap...'].map((msg, i) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0 }}
                  animate={processingStep > i ? { opacity: 1 } : { opacity: 0.3 }}
                  className="flex items-center justify-center gap-2 text-sm"
                >
                  {processingStep > i ? <Check className="w-4 h-4 tk-accent-green" /> : <span className="w-4 h-4 rounded-full border border-muted inline-block" />}
                  <span className={processingStep > i ? 'text-foreground' : 'tk-text-muted'}>{msg}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(216 30% 18%)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: 'linear' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(220 100% 62%), hsl(190 100% 50%))' }}
              />
            </div>
          </div>
        );
      case 12:
        return (
          <div className="glass-card p-8 md:p-10 rounded-3xl max-w-[800px] mx-auto">
            <h3 className="font-display font-bold text-2xl mb-6 text-center">Your Business Growth Score</h3>
            <div className="flex justify-center mb-8">
              <ScoreGauge score={score} />
            </div>

            {/* Revenue Leakage */}
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'hsl(0 84% 60% / 0.08)', borderLeft: '4px solid hsl(0 84% 60%)' }}>
              <div className="flex items-center gap-2 text-sm font-medium mb-1"><span>🔴</span> Estimated Annual Revenue Leakage</div>
              <div className="font-mono text-xl font-bold">{formatRevenue(leakLow)} — {formatRevenue(leakHigh)}</div>
              <p className="text-xs tk-text-muted mt-1">Based on your current systems maturity and team size</p>
            </div>

            {/* Gaps */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs tk-text-muted uppercase tracking-widest mb-2">Gaps Identified</h4>
              {[
                ['Fragmented lead management', 'High Impact'],
                ['Manual conversion processes', 'Medium Impact'],
                ['No real-time business intelligence', 'High Impact'],
              ].map(([gap, impact]) => (
                <div key={gap} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'hsl(37 91% 55% / 0.06)' }}>
                  <span className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 tk-accent-gold" /> {gap}</span>
                  <span className="text-xs font-mono tk-accent-gold">{impact}</span>
                </div>
              ))}
            </div>

            {/* Opportunities */}
            <div className="space-y-2 mb-8">
              <h4 className="text-xs tk-text-muted uppercase tracking-widest mb-2">Growth Opportunities</h4>
              {[
                ['AI-powered lead automation', '2X lead capacity'],
                ['CRM + workflow integration', '30–50% conversion lift'],
                ['Business intelligence layer', 'Faster decision-making'],
              ].map(([opp, result]) => (
                <div key={opp} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'hsl(160 100% 45% / 0.06)' }}>
                  <span className="text-sm flex items-center gap-2"><Check className="w-4 h-4 tk-accent-green" /> {opp}</span>
                  <span className="text-xs font-mono tk-accent-green">{result}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 rounded-xl text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
              style={{ background: 'linear-gradient(135deg, hsl(220 100% 62%), hsl(190 100% 50%))', color: 'hsl(220 50% 96%)' }}>
              Get Your Full Growth Execution Plan →
            </button>
            <button className="w-full py-3 rounded-xl text-sm mt-2 tk-text-secondary hover:text-foreground transition-colors" style={{ border: '1px solid hsl(216 30% 18%)' }}>
              Download Summary Report
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="diagnosis" ref={sectionRef} className="py-24 md:py-32 relative" style={{ backgroundColor: 'hsl(222 50% 6%)' }}>
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-50" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="section-label">AI GROWTH ENGINE</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-4">
            Your Personalised<br />Growth Blueprint Starts Here
          </h2>
        </motion.div>

        {/* Progress */}
        <div className="max-w-[640px] mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs tk-text-muted">Step {step} of {TOTAL_STEPS}</span>
            <span className="font-mono text-xs tk-text-muted">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(216 30% 18%)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, hsl(220 100% 62%), hsl(190 100% 50%))' }} />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        {step < 11 && (
          <div className="flex justify-center gap-3 mt-8">
            {step > 1 && (
              <button onClick={prev} className="px-5 py-2.5 rounded-xl text-sm tk-text-secondary hover:text-foreground transition-colors flex items-center gap-2"
                style={{ border: '1px solid hsl(216 30% 18%)' }}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button onClick={next}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2">
              {step === 10 ? 'Analyse My Business' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
