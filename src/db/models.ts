export interface PerformanceMetric {
  id: number;
  metric_date: Date;
  revenue: number;
  users: number;
  growth_rate: number;
  satisfaction_score: number;
}

export interface BusinessHealth {
  id: number;
  category: string;
  current_value: number;
  target_value: number;
  efficiency_rate: number;
  report_date: Date;
}

export interface MarketAnalysis {
  id: number;
  analysis_date: Date;
  market_value: number;
  industry_value: number;
  company_value: number;
  market_share: number;
}

export interface RiskAssessment {
  id: number;
  risk_type: string;
  risk_value: number;
  impact_level: string;
  assessment_date: Date;
}

export interface OperationalMetric {
  id: number;
  metric_date: Date;
  efficiency: number;
  quality: number;
  speed: number;
  reliability: number;
  cost_efficiency: number;
  innovation_score: number;
}
