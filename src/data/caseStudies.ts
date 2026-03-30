export interface Stat {
  val: string;
  label: string;
}

export interface BeforeAfterItem {
  metric: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  image: string;
  industry: string;
  headline: string;
  subheadline: string;
  tags: string[];
  stats: Stat[];
  challenge: string;
  solution: string;
  before: BeforeAfterItem[];
  after: BeforeAfterItem[];
  results: string[];
  timeline: string;
  client: string;
  tools: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-automation-digital-marketing',
    image: '/data/clinic.jpg',
    industry: 'Healthcare Clinic Network — Lead & Patient Acquisition',
    headline: 'Zero to Automated: AI-Powered Patient Acquisition',
    subheadline:
      'A Bengaluru clinic chain used AI-driven automation to convert 180% more patients — without hiring a single new team member.',
    tags: ['AI Automation', 'Lead Nurturing', 'Healthcare', 'WhatsApp Bots'],
    stats: [
      { val: '180%', label: 'Revenue Growth' },
      { val: '0', label: 'New Hires Required' },
      { val: '74%', label: 'Lead Response Time Reduction' },
      { val: '3.8X', label: 'Appointment Conversion Rate' },
    ],
    challenge:
      'A 6-clinic orthopaedic and physiotherapy chain in Bengaluru was generating 400–500 enquiry leads per month across Google Ads, Meta, and their website — but converting only 11% of them into booked appointments. The front desk team was overwhelmed, response times averaged 6–8 hours, and leads were going cold before staff could follow up. There was no CRM in place; leads were tracked in spreadsheets. The medical director recognised that the bottleneck was not the number of leads but the speed and quality of follow-up, and the clinic was losing ₹25–30 lakh in potential monthly revenue to slow response and no-follow-up attrition.',
    solution:
      'TekKeys deployed an AI-powered lead nurturing system built on a WhatsApp Business API chatbot, an automated SMS/email sequence, and a lightweight CRM integration. The moment a lead fills a form or clicks a Call-to-Action, the AI bot responds within 90 seconds — collecting symptom details, insurance information, and preferred appointment time. High-intent leads are instantly routed to an online booking calendar; medium-intent leads enter a 5-touch automated nurture sequence spanning 7 days. The system also uses AI to score each lead based on symptom urgency, enabling the front desk to prioritise only the highest-value follow-ups. Monthly retargeting campaigns are automatically triggered for leads who did not convert within 30 days.',
    before: [
      { metric: 'Average Lead Response Time', value: '6–8 hours' },
      { metric: 'Lead-to-Appointment Conversion Rate', value: '11%' },
      { metric: 'Monthly Appointments Booked', value: '48' },
      { metric: 'No-Show Rate', value: '34%' },
      { metric: 'Monthly Revenue from New Patients', value: '₹8.4 lakh' },
    ],
    after: [
      { metric: 'Average Lead Response Time', value: '<90 seconds' },
      { metric: 'Lead-to-Appointment Conversion Rate', value: '41%' },
      { metric: 'Monthly Appointments Booked', value: '183' },
      { metric: 'No-Show Rate', value: '9%' },
      { metric: 'Monthly Revenue from New Patients', value: '₹23.5 lakh' },
    ],
    results: [
      'Lead-to-appointment conversion rate jumped from 11% to 41% — a 3.7x improvement — driven entirely by faster AI-powered follow-up, not more spend.',
      'Monthly booked appointments grew from 48 to 183, with the same front-desk headcount, as routine triage was absorbed by the AI bot.',
      'No-show rates fell from 34% to 9% through automated appointment reminders via WhatsApp, SMS, and a follow-up call trigger 24 hours before each slot.',
      'Monthly revenue from new patient acquisition grew 180% — from ₹8.4 lakh to ₹23.5 lakh — within 4 months of system go-live.',
      'The clinic network now has a complete lead CRM with visibility into pipeline stage, lead source ROI, and monthly booking trends for the first time.',
    ],
    timeline: '4 months',
    client: 'Orthopaedic & Physiotherapy Clinic Chain, Bengaluru',
    tools: ['WhatsApp Business API', 'Twilio', 'HubSpot CRM', 'Zapier', 'OpenAI GPT-4', 'Google Ads', 'Meta Lead Ads', 'Calendly API'],
  },
  {
    slug: 'crm-utilisation-benefits',
    image: '/data/consultants and agency.jpg',
    industry: 'B2B Services — IT Consulting & Staffing',
    headline: 'Fragmented to Focused: CRM That Tripled the Pipeline',
    subheadline:
      'A Hyderabad IT services firm replaced spreadsheets and scattered email threads with a CRM system that tripled their qualified pipeline and grew revenue from ₹12Cr to ₹36Cr in 11 months.',
    tags: ['CRM Implementation', 'Sales Automation', 'Pipeline Management', 'B2B'],
    stats: [
      { val: '3X', label: 'Revenue Growth' },
      { val: '₹12Cr → ₹36Cr', label: 'ARR Increase' },
      { val: '67%', label: 'Shorter Sales Cycle' },
      { val: '11', label: 'Months to 3X' },
    ],
    challenge:
      'A 45-person IT consulting and staffing firm in Hyderabad had grown to ₹12 Cr ARR primarily through founder-led relationships and referrals. As the sales team expanded to 8 reps, the lack of a CRM became a critical bottleneck. Deals were tracked in 14 different spreadsheets, follow-ups were missed routinely, and the leadership team had no visibility into pipeline health or individual rep performance. The average sales cycle was 94 days — nearly double the industry benchmark — and win rates were declining as deal complexity increased. Three mid-sized enterprise deals worth a combined ₹4 Cr had been lost in the previous quarter due to delayed proposals and missed stakeholder follow-ups.',
    solution:
      'TekKeys implemented HubSpot Sales Hub with a customised deal pipeline reflecting the firm\'s specific 7-stage B2B sales process. All existing leads were migrated and enriched from the spreadsheets. We built automated task sequences for each pipeline stage — including proposal reminders, stakeholder follow-up cadences, and contract renewal alerts. A custom dashboard gave the founding team real-time visibility into stage-wise pipeline value, individual rep metrics, and deal velocity. Sales reps were trained over 3 focused sessions; adoption was enforced through a mandatory CRM-first policy for commissions. We also integrated HubSpot with the firm\'s email, LinkedIn Sales Navigator, and accounting tool for end-to-end visibility from lead to revenue.',
    before: [
      { metric: 'Annual Recurring Revenue', value: '₹12 Cr' },
      { metric: 'Average Sales Cycle Length', value: '94 days' },
      { metric: 'Pipeline Visibility', value: 'None (spreadsheets)' },
      { metric: 'Lead Follow-Up Consistency', value: '~40% of leads followed up' },
      { metric: 'Proposal Turnaround Time', value: '8–12 days' },
    ],
    after: [
      { metric: 'Annual Recurring Revenue', value: '₹36 Cr' },
      { metric: 'Average Sales Cycle Length', value: '31 days' },
      { metric: 'Pipeline Visibility', value: 'Real-time, stage-wise dashboard' },
      { metric: 'Lead Follow-Up Consistency', value: '97% of leads auto-sequenced' },
      { metric: 'Proposal Turnaround Time', value: '1.5 days (templated)' },
    ],
    results: [
      'Revenue grew 3x — from ₹12 Cr to ₹36 Cr — within 11 months, driven by higher win rates, shorter cycles, and a larger active pipeline.',
      'Sales cycle shortened by 67%, from 94 days to 31 days, as automated follow-up sequences eliminated manual coordination lag.',
      'CRM adoption reached 97% within 6 weeks, with all 8 sales reps logging every interaction — giving leadership full pipeline transparency for the first time.',
      'Proposal turnaround dropped from 8–12 days to under 36 hours using HubSpot\'s templated proposal builder integrated with the deal record.',
      'The firm closed 3 enterprise deals worth ₹6.2 Cr that had been in the pipeline for over 90 days — unlocked by automated stakeholder re-engagement sequences.',
    ],
    timeline: '11 months',
    client: 'IT Consulting & Staffing Firm, Hyderabad',
    tools: ['HubSpot Sales Hub', 'LinkedIn Sales Navigator', 'Zapier', 'Google Workspace', 'PandaDoc', 'Tally ERP Integration', 'Slack'],
  },
  {
    slug: 'erp-implementation-benefits',
    image: '/data/sme.jpg',
    industry: 'Manufacturing SME — Industrial Components',
    headline: 'Manual to Machine: ERP That Eliminated ₹2.4Cr in Annual Waste',
    subheadline:
      'A Pune industrial components manufacturer replaced 18 Excel files and a legacy billing system with a unified ERP — cutting operational costs by 70% and quadrupling output capacity.',
    tags: ['ERP Implementation', 'Process Automation', 'Manufacturing', 'Inventory Management'],
    stats: [
      { val: '70%', label: 'Operational Cost Reduction' },
      { val: '4X', label: 'Output Capacity' },
      { val: '₹2.4Cr', label: 'Annual Waste Eliminated' },
      { val: '6', label: 'Months to Full ROI' },
    ],
    challenge:
      'A 110-person manufacturer of precision industrial components in Pune was operating on a patchwork of 18 Excel files, a decade-old billing software, and WhatsApp groups for production coordination. Inventory was counted manually every fortnight, leading to chronic over-stocking of slow-moving SKUs and stockouts of fast-moving components. Purchase orders were raised on gut feel, production planning was reactive, and the finance team spent 12–14 days closing each month\'s books. Machine downtime was untracked; customer delivery timelines were being missed on 31% of orders. The MD estimated that operational inefficiency was costing the company ₹2.4 Cr annually in waste, rework, and missed SLAs.',
    solution:
      'TekKeys implemented Odoo ERP across Manufacturing, Inventory, Purchase, Accounting, and CRM modules — configured specifically for the client\'s make-to-order and make-to-stock production workflows. Data from the legacy billing system and inventory records were cleaned and migrated. We built custom workflows for production scheduling, quality checkpoints, and supplier evaluation. The shop floor was connected via barcode scanning stations at key production stages, giving the planning team real-time WIP visibility. Automated reorder rules were configured based on 90-day consumption patterns, eliminating manual stock checks. The finance module reduced month-end close from 14 days to 2 days through automated reconciliation and integrated GST filing.',
    before: [
      { metric: 'Inventory Carrying Cost (Monthly)', value: '₹18.2 lakh' },
      { metric: 'On-Time Delivery Rate', value: '69%' },
      { metric: 'Month-End Close Time', value: '12–14 days' },
      { metric: 'Machine Downtime Visibility', value: 'None' },
      { metric: 'Order Fulfilment Cycle Time', value: '22 days avg.' },
    ],
    after: [
      { metric: 'Inventory Carrying Cost (Monthly)', value: '₹6.8 lakh' },
      { metric: 'On-Time Delivery Rate', value: '96%' },
      { metric: 'Month-End Close Time', value: '2 days' },
      { metric: 'Machine Downtime Visibility', value: 'Real-time dashboard' },
      { metric: 'Order Fulfilment Cycle Time', value: '9 days avg.' },
    ],
    results: [
      'Inventory carrying cost dropped 63% — from ₹18.2 lakh to ₹6.8 lakh monthly — through automated reorder rules eliminating over-procurement.',
      'On-time delivery rate improved from 69% to 96%, recovering key accounts that had flagged SLA breaches and were considering switching suppliers.',
      'Month-end financial close compressed from 12–14 days to 2 days, freeing the finance team to focus on planning and cost analysis instead of reconciliation.',
      'Production output capacity quadrupled within 6 months as the planning team could schedule machines, materials, and manpower simultaneously for the first time.',
      'The ₹2.4 Cr annual waste estimate was validated post-implementation — full ERP ROI was achieved in under 6 months against a project investment of ₹38 lakh.',
    ],
    timeline: '6 months',
    client: 'Precision Industrial Components Manufacturer, Pune',
    tools: ['Odoo ERP', 'Odoo Manufacturing', 'Odoo Inventory', 'Odoo Accounting', 'GST Filing Integration', 'Barcode Scanning', 'Power BI'],
  },
  {
    slug: 'full-digital-transformation',
    image: '/data/tech company.jpg',
    industry: 'B2C Services — EdTech & Skill Development',
    headline: 'The Full Stack: AI + CRM + ERP in One Transformation',
    subheadline:
      'A Delhi-NCR edtech company unified their entire business on a single intelligence layer — combining AI automation, CRM, and ERP — to scale from ₹8Cr to ₹31Cr ARR in 14 months.',
    tags: ['Full Digital Transformation', 'AI Automation', 'CRM', 'ERP', 'EdTech'],
    stats: [
      { val: '3.9X', label: 'Revenue Growth in 14 Months' },
      { val: '₹8Cr → ₹31Cr', label: 'ARR Scaling' },
      { val: '82%', label: 'Ops Cost as % of Revenue — Reduced' },
      { val: '14', label: 'Months End-to-End' },
    ],
    challenge:
      'A fast-growing skill development and professional training company in Delhi-NCR had scaled to ₹8 Cr ARR in 3 years, but was facing a wall. The sales team used 3 different tools with no unified view of the student journey — from lead to enrolment to course completion. Finance was managed in Tally with no integration to either sales or operations, making revenue forecasting guesswork. Student support ran on individual WhatsApp numbers. Course delivery was manual and instructor-dependent, with no platform to automate reminders, assessments, or certificate issuance. As batch sizes grew, so did complaints — NPS had dropped to 28. The founders knew they needed to systemise the entire business before the next funding round, not just fix individual departments.',
    solution:
      'TekKeys designed and deployed a three-layer transformation over 14 months. Layer 1 (Months 1–4): AI-powered marketing and lead automation — Meta + Google ads were rebuilt with AI creative testing, and a WhatsApp AI bot handled all initial lead qualification and course counselling, routing only sales-ready leads to human counsellors. Layer 2 (Months 3–8): HubSpot CRM was implemented with a custom pipeline for the student enrolment journey — from inquiry to counselling, enrolment, and post-purchase onboarding. Automated sequences handled follow-ups, scholarship offers, and cross-sell of advanced modules. Layer 3 (Months 6–14): Odoo ERP was integrated across Finance, HR, and Operations — connecting batch scheduling, instructor payouts, and revenue recognition into one system. A custom student portal was built on Odoo with automated batch reminders, assessment delivery, and certificate issuance.',
    before: [
      { metric: 'Annual Revenue (ARR)', value: '₹8 Cr' },
      { metric: 'Lead-to-Enrolment Conversion Rate', value: '8%' },
      { metric: 'Student NPS Score', value: '28' },
      { metric: 'Revenue Forecast Accuracy', value: '±40%' },
      { metric: 'Ops Cost as % of Revenue', value: '68%' },
    ],
    after: [
      { metric: 'Annual Revenue (ARR)', value: '₹31 Cr' },
      { metric: 'Lead-to-Enrolment Conversion Rate', value: '29%' },
      { metric: 'Student NPS Score', value: '71' },
      { metric: 'Revenue Forecast Accuracy', value: '±6%' },
      { metric: 'Ops Cost as % of Revenue', value: '31%' },
    ],
    results: [
      'Revenue grew 3.9x — from ₹8 Cr to ₹31 Cr ARR — within 14 months, making the company one of the fastest-growing D2C edtech brands in its category.',
      'Lead-to-enrolment conversion rate rose from 8% to 29% as the AI bot pre-qualified leads and counsellors only handled high-intent prospects.',
      'Student NPS climbed from 28 to 71 — a transformation driven by automated onboarding flows, timely assessment reminders, and instant certificate issuance.',
      'Revenue forecast accuracy improved from ±40% to ±6%, enabling the founders to plan instructor capacity, batch sizes, and marketing spend with confidence.',
      'Operations cost as a percentage of revenue was cut nearly in half — from 68% to 31% — as manual coordination was replaced by system-driven workflows across finance, HR, and course delivery.',
    ],
    timeline: '14 months',
    client: 'Skill Development & Professional Training Company, Delhi-NCR',
    tools: [
      'HubSpot CRM',
      'Odoo ERP',
      'WhatsApp Business API',
      'OpenAI GPT-4',
      'Meta Ads',
      'Google Ads',
      'Zapier',
      'Stripe',
      'Razorpay',
      'Custom Student Portal',
      'Power BI',
    ],
  },
];
