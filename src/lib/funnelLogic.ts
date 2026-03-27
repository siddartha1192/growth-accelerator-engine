export interface FunnelData {
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

export function calculateScore(data: FunnelData): number {
  let score = 100;
  if (data.conversionSystem === 'manual') score -= 20;
  if (data.conversionSystem === 'none') score -= 30;
  if (data.operationsMaturity <= 2) score -= 15;
  if (data.toolsUsed.includes('none')) score -= 15;
  if (data.leadSources.length <= 1) score -= 10;
  if (data.painPoints.length >= 3) score -= 10;
  if (data.techCapability === 'None' || data.techCapability === 'Basic') score -= 10;
  return Math.max(score, 20);
}

export function estimateLeakage(revenueLakhs: number, score: number): [number, number] {
  const leakageRate = (100 - score) / 100;
  const low = Math.round(revenueLakhs * leakageRate * 0.15);
  const high = Math.round(revenueLakhs * leakageRate * 0.40);
  return [low, high];
}

export function formatRevenue(lakhs: number): string {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)}Cr`;
  return `₹${lakhs}L`;
}
