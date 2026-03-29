export interface FunnelData {
  // Contact (captured on step 1)
  email: string;
  phone: string;
  // Business
  businessType: string;
  websiteUrl: string;
  currentRevenue: number;
  targetRevenue: number;
  leadSources: string[];
  monthlyLeads: number;
  conversionSystem: string;
  operationsMaturity: number;
  competitors: string[];
  idealCustomers: string[];
  painPoints: string[];
  salesTeamSize: number;
  marketingTeamSize: number;
  techCapability: string;
  toolsUsed: string[];
}

export const defaultFunnelData: FunnelData = {
  email: '',
  phone: '',
  businessType: '',
  websiteUrl: '',
  currentRevenue: 100,
  targetRevenue: 300,
  leadSources: [],
  monthlyLeads: 0,
  conversionSystem: '',
  operationsMaturity: 3,
  competitors: ['', '', ''],
  idealCustomers: [],
  painPoints: [],
  salesTeamSize: 0,
  marketingTeamSize: 0,
  techCapability: '',
  toolsUsed: [],
};

/**
 * Score starts at 90 (enterprise baseline).
 * Only penalises when the user explicitly selects under-performing options.
 * With zero input the score is always 90.
 */
export function calculateScore(data: FunnelData): number {
  let score = 90;

  // Conversion system
  if (data.conversionSystem === 'none')   score -= 22;
  if (data.conversionSystem === 'manual') score -= 14;

  // Operations maturity
  if (data.operationsMaturity <= 2) score -= 10;

  // Tech stack
  if (data.techCapability === 'None')  score -= 10;
  if (data.techCapability === 'Basic') score -= 5;

  // No tools at all
  if (data.toolsUsed.includes('none')) score -= 10;

  // Single acquisition channel
  if (data.leadSources.length === 1) score -= 6;

  // Overwhelmed with pain (4+ issues selected)
  if (data.painPoints.length >= 4) score -= 6;

  return Math.max(score, 74);
}

export function getScoreLabel(score: number): { label: string; subtitle: string; color: string } {
  if (score >= 88) return {
    label: 'Excellent Growth Foundation',
    subtitle: 'Your business is primed for AI-accelerated scale.',
    color: 'hsl(160 100% 45%)',
  };
  if (score >= 72) return {
    label: 'Growth-Ready',
    subtitle: 'Strong base — targeted automation unlocks the next tier.',
    color: 'hsl(37 91% 55%)',
  };
  return {
    label: 'Needs Optimisation',
    subtitle: 'Clear structural gaps identified. Fast wins available.',
    color: 'hsl(0 84% 60%)',
  };
}

export function generateGaps(data: FunnelData): Array<{ label: string; impact: string }> {
  const pool: Array<{ label: string; impact: string; when: boolean }> = [
    {
      label: 'Lead pipeline lacks automated nurturing',
      impact: 'High Impact',
      when: !data.conversionSystem || data.conversionSystem === 'manual' || data.conversionSystem === 'none',
    },
    {
      label: 'Revenue concentrated in a single acquisition channel',
      impact: 'High Impact',
      when: data.leadSources.length === 1,
    },
    {
      label: 'Manual operations creating scaling bottlenecks',
      impact: 'High Impact',
      when: data.operationsMaturity <= 2,
    },
    {
      label: 'No unified growth intelligence layer',
      impact: 'High Impact',
      when: data.toolsUsed.length === 0 || data.toolsUsed.includes('none'),
    },
    {
      label: 'Sales velocity below industry benchmark',
      impact: 'High Impact',
      when: data.painPoints.includes('Low conversion rates'),
    },
    {
      label: 'Conversion funnel lacks AI-driven personalisation',
      impact: 'Medium Impact',
      when: data.conversionSystem === 'basic' || data.conversionSystem === '',
    },
    {
      label: 'Operational data not feeding predictive AI insights',
      impact: 'Medium Impact',
      when: data.operationsMaturity >= 3,
    },
    {
      label: 'No clear growth strategy or measurable KPIs',
      impact: 'High Impact',
      when: data.painPoints.includes('No clear growth strategy'),
    },
  ];

  const matched = pool.filter(g => g.when).map(({ label, impact }) => ({ label, impact }));

  // Always return exactly 3-4 insightful gaps
  const fallbacks = [
    { label: 'Fragmented lead management across channels', impact: 'High Impact' },
    { label: 'No predictive revenue intelligence in place', impact: 'High Impact' },
    { label: 'Customer acquisition cost not systematically tracked', impact: 'Medium Impact' },
    { label: 'AI-readiness gap limiting competitive advantage', impact: 'Medium Impact' },
  ];

  const combined = [...matched];
  for (const fb of fallbacks) {
    if (combined.length >= 3) break;
    if (!combined.some(g => g.label === fb.label)) combined.push(fb);
  }

  return combined.slice(0, 4);
}

export function generateOpportunities(data: FunnelData): Array<{ label: string; result: string }> {
  const leadCapacity = data.monthlyLeads > 0
    ? `${Math.round(data.monthlyLeads * 1.9)}+ qualified leads/mo`
    : '2× qualified lead capacity';

  const revenueTarget = data.targetRevenue > data.currentRevenue
    ? `On track to ${formatRevenue(data.targetRevenue)} in 12 months`
    : 'Revenue acceleration framework';

  return [
    { label: 'AI-powered lead acquisition engine', result: leadCapacity },
    { label: 'Automated revenue funnel deployment', result: revenueTarget },
    {
      label: data.conversionSystem === 'automated'
        ? 'Advanced CRM intelligence & retention layer'
        : 'CRM + workflow automation rollout',
      result: data.conversionSystem === 'automated'
        ? '20–35% retention improvement'
        : '30–50% conversion lift',
    },
    { label: 'Real-time business intelligence dashboard', result: 'Decisions in minutes, not days' },
  ].slice(0, 3);
}

export function estimateLeakage(revenueLakhs: number, score: number): [number, number] {
  const leakageRate = (100 - score) / 100;
  const annual = revenueLakhs * 12;
  const low = Math.round(annual * leakageRate * 0.12);
  const high = Math.round(annual * leakageRate * 0.38);
  return [low, high];
}

export function formatRevenue(lakhs: number): string {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`;
  return `₹${lakhs}L`;
}
