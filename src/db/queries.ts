import pool from './config';
import { PerformanceMetric, BusinessHealth, MarketAnalysis, RiskAssessment, OperationalMetric } from './models';

export const queries = {
  // Performance Metrics
  async getPerformanceMetrics(timeRange: string): Promise<PerformanceMetric[]> {
    const query = `
      SELECT * FROM performance_metrics 
      WHERE metric_date >= NOW() - INTERVAL '${timeRange}'
      ORDER BY metric_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Business Health
  async getBusinessHealth(timeRange: string): Promise<BusinessHealth[]> {
    const query = `
      SELECT * FROM business_health 
      WHERE report_date >= NOW() - INTERVAL '${timeRange}'
      ORDER BY report_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Market Analysis
  async getMarketAnalysis(timeRange: string): Promise<MarketAnalysis[]> {
    const query = `
      SELECT * FROM market_analysis 
      WHERE analysis_date >= NOW() - INTERVAL '${timeRange}'
      ORDER BY analysis_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Risk Assessment
  async getRiskAssessment(): Promise<RiskAssessment[]> {
    const query = `
      SELECT * FROM risk_assessment 
      WHERE assessment_date = (
        SELECT MAX(assessment_date) FROM risk_assessment
      )
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Operational Metrics
  async getOperationalMetrics(timeRange: string): Promise<OperationalMetric[]> {
    const query = `
      SELECT * FROM operational_metrics 
      WHERE metric_date >= NOW() - INTERVAL '${timeRange}'
      ORDER BY metric_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }
};
