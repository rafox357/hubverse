-- Create performance_metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
    id SERIAL PRIMARY KEY,
    metric_date TIMESTAMP NOT NULL DEFAULT NOW(),
    revenue DECIMAL NOT NULL,
    users INTEGER NOT NULL,
    growth_rate DECIMAL NOT NULL,
    satisfaction_score DECIMAL NOT NULL
);

-- Create business_health table
CREATE TABLE IF NOT EXISTS business_health (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    current_value DECIMAL NOT NULL,
    target_value DECIMAL NOT NULL,
    efficiency_rate DECIMAL NOT NULL,
    report_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create market_analysis table
CREATE TABLE IF NOT EXISTS market_analysis (
    id SERIAL PRIMARY KEY,
    analysis_date TIMESTAMP NOT NULL DEFAULT NOW(),
    market_value DECIMAL NOT NULL,
    industry_value DECIMAL NOT NULL,
    company_value DECIMAL NOT NULL,
    market_share DECIMAL NOT NULL
);

-- Create risk_assessment table
CREATE TABLE IF NOT EXISTS risk_assessment (
    id SERIAL PRIMARY KEY,
    risk_type VARCHAR(100) NOT NULL,
    risk_value DECIMAL NOT NULL,
    impact_level VARCHAR(50) NOT NULL,
    assessment_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create operational_metrics table
CREATE TABLE IF NOT EXISTS operational_metrics (
    id SERIAL PRIMARY KEY,
    metric_date TIMESTAMP NOT NULL DEFAULT NOW(),
    efficiency DECIMAL NOT NULL,
    quality DECIMAL NOT NULL,
    speed DECIMAL NOT NULL,
    reliability DECIMAL NOT NULL,
    cost_efficiency DECIMAL NOT NULL,
    innovation_score DECIMAL NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date ON performance_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_business_health_date ON business_health(report_date);
CREATE INDEX IF NOT EXISTS idx_market_analysis_date ON market_analysis(analysis_date);
CREATE INDEX IF NOT EXISTS idx_risk_assessment_date ON risk_assessment(assessment_date);
CREATE INDEX IF NOT EXISTS idx_operational_metrics_date ON operational_metrics(metric_date);
