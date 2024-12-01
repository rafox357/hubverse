import React, { useState } from 'react';
import {
  FiShield, FiMail, FiBox, FiDollarSign, FiCalendar,
  FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiUsers,
  FiShoppingCart, FiActivity, FiGlobe, FiMessageSquare,
  FiTruck, FiHeadphones, FiLayout
} from 'react-icons/fi';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, BarChart, Bar, AreaChart, Area, PieChart, Pie,
  Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import KPICard from './KPICard';
import ChartCard from './ChartCard';
import BusinessDevelopment from '../Business/BusinessDevelopment';
import SupplyChain from '../Business/SupplyChain';
import CustomerService from '../Business/CustomerService';
import Networking from '../Business/Networking';
import FigmaEmbed from '../Figma/FigmaEmbed';
import TimeFrameSelector from '../TimeFrame/TimeFrameSelector';

const MainDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Performance Metrics Data
  const performanceData = [
    { month: 'Jan', revenue: 4000, users: 2400, growth: 24, satisfaction: 85 },
    { month: 'Feb', revenue: 3000, users: 1398, growth: 18, satisfaction: 88 },
    { month: 'Mar', revenue: 2000, users: 9800, growth: 38, satisfaction: 92 },
    { month: 'Apr', revenue: 2780, users: 3908, growth: 42, satisfaction: 90 },
    { month: 'May', revenue: 1890, users: 4800, growth: 28, satisfaction: 87 },
    { month: 'Jun', revenue: 2390, users: 3800, growth: 32, satisfaction: 89 }
  ];

  // Business Health Data
  const healthData = [
    { category: 'Sales', current: 4000, target: 5000, efficiency: 80 },
    { category: 'Leads', current: 3000, target: 3500, efficiency: 85 },
    { category: 'Retention', current: 2000, target: 2000, efficiency: 100 },
    { category: 'Support', current: 2780, target: 2500, efficiency: 110 }
  ];

  // Market Analysis Data
  const marketData = [
    { month: 'Jan', market: 4000, industry: 2400, company: 2400, share: 15 },
    { month: 'Feb', market: 3000, industry: 1398, company: 2210, share: 16 },
    { month: 'Mar', market: 2000, industry: 9800, company: 2290, share: 18 },
    { month: 'Apr', market: 2780, industry: 3908, company: 2000, share: 14 },
    { month: 'May', market: 1890, industry: 4800, company: 2181, share: 17 },
    { month: 'Jun', market: 2390, industry: 3800, company: 2500, share: 19 }
  ];

  // Risk Assessment Data
  const riskData = [
    { name: 'Low Risk', value: 400, color: '#82ca9d' },
    { name: 'Medium Risk', value: 300, color: '#ffc658' },
    { name: 'High Risk', value: 100, color: '#ff8042' },
    { name: 'Critical', value: 50, color: '#ff4242' }
  ];

  // Operational Metrics
  const operationalData = [
    { subject: 'Efficiency', A: 120, B: 110, fullMark: 150 },
    { subject: 'Quality', A: 98, B: 130, fullMark: 150 },
    { subject: 'Speed', A: 86, B: 130, fullMark: 150 },
    { subject: 'Reliability', A: 99, B: 100, fullMark: 150 },
    { subject: 'Cost', A: 85, B: 90, fullMark: 150 },
    { subject: 'Innovation', A: 65, B: 85, fullMark: 150 }
  ];

  // Enhanced KPI data
  const kpiData = {
    overview: {
      performance: { value: "92%", change: { value: "5%", isPositive: true }, info: "Above Target" },
      revenue: { value: "$1.2M", change: { value: "12%", isPositive: true }, info: "Monthly Growth" },
      customers: { value: "2,847", change: { value: "8%", isPositive: true }, info: "Active Users" },
      satisfaction: { value: "4.8", change: { value: "0.3", isPositive: true }, info: "Out of 5.0" }
    },
    business: {
      leads: { value: "156", change: { value: "28%", isPositive: true }, info: "45 hot" },
      conversion: { value: "32%", change: { value: "5%", isPositive: true }, info: "This Month" },
      revenue: { value: "$48,234", change: { value: "17%", isPositive: true }, info: "+$7,892" },
      partnerships: { value: "24", change: { value: "33%", isPositive: true }, info: "8 active deals" }
    },
    supply: {
      inventory: { value: "2,567", change: { value: "8%", isPositive: false }, info: "12 low stock" },
      suppliers: { value: "48", change: { value: "2", isPositive: true }, info: "Active Suppliers" },
      orders: { value: "1,234", change: { value: "23%", isPositive: true }, info: "89 pending" },
      efficiency: { value: "94%", change: { value: "3%", isPositive: true }, info: "Supply Chain" }
    },
    service: {
      tickets: { value: "38", change: { value: "5%", isPositive: true }, info: "4 escalated" },
      resolution: { value: "92%", change: { value: "3%", isPositive: true }, info: "First Contact" },
      satisfaction: { value: "4.7", change: { value: "0.2", isPositive: true }, info: "Customer Rating" },
      response: { value: "2.4h", change: { value: "15%", isPositive: true }, info: "Avg Response" }
    }
  };

  // Time range filtering
  const filterDataByTimeRange = (data: any[]) => {
    const now = new Date();
    const timeRangeMap: { [key: string]: number } = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90
    };

    const daysToSubtract = timeRangeMap[selectedTimeRange];
    const startDate = new Date(now.setDate(now.getDate() - daysToSubtract));

    // For demo data, we'll just return a subset of the data
    // In real implementation, this would filter based on actual dates
    const dataLength = data.length;
    const itemsToShow = Math.max(1, Math.floor((daysToSubtract / 90) * dataLength));
    return data.slice(-itemsToShow);
  };

  // Filtered data based on time range
  const filteredPerformanceData = filterDataByTimeRange(performanceData);
  const filteredHealthData = filterDataByTimeRange(healthData);
  const filteredMarketData = filterDataByTimeRange(marketData);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiActivity },
    { id: 'business', label: 'Business Development', icon: FiTrendingUp },
    { id: 'supply', label: 'Supply Chain', icon: FiBox },
    { id: 'service', label: 'Customer Service', icon: FiMessageSquare },
    { id: 'network', label: 'Networking', icon: FiUsers },
    { id: 'design', label: 'Design System', icon: FiLayout }
  ];

  const timeFrames = [
    { value: '24h', label: 'Daily (24h)' },
    { value: '7d', label: 'Weekly (7d)' },
    { value: '30d', label: 'Monthly (30d)' },
    { value: '90d', label: 'Quarterly (90d)' },
    { value: '1y', label: 'Annually (1y)' }
  ];

  // Helper function to get icon for KPI
  const getIconForKPI = (key: string) => {
    const iconMap: { [key: string]: any } = {
      // Overview KPIs
      performance: FiActivity,
      revenue: FiDollarSign,
      customers: FiUsers,
      satisfaction: FiCheckCircle,

      // Business KPIs
      leads: FiTrendingUp,
      conversion: FiShoppingCart,
      partnerships: FiGlobe,

      // Supply Chain KPIs
      inventory: FiBox,
      suppliers: FiTruck,
      orders: FiShoppingCart,
      efficiency: FiActivity,

      // Service KPIs
      tickets: FiMessageSquare,
      resolution: FiCheckCircle,
      response: FiMail
    };
    return iconMap[key] || FiActivity;
  };

  // Helper function to get icon color for KPI
  const getIconColorForKPI = (key: string) => {
    const colorMap: { [key: string]: string } = {
      // Overview colors
      performance: 'blue',
      revenue: 'green',
      customers: 'purple',
      satisfaction: 'teal',

      // Business colors
      leads: 'orange',
      conversion: 'blue',
      partnerships: 'indigo',

      // Supply Chain colors
      inventory: 'yellow',
      suppliers: 'blue',
      orders: 'green',
      efficiency: 'purple',

      // Service colors
      tickets: 'red',
      resolution: 'green',
      response: 'blue'
    };
    return colorMap[key] || 'blue';
  };

  // Helper function to render KPI cards based on active tab
  const renderKPICards = () => {
    const cards = kpiData[activeTab as keyof typeof kpiData] || kpiData.overview;
    return Object.entries(cards).map(([key, data]) => {
      const Icon = getIconForKPI(key);
      return (
        <KPICard
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          value={data.value}
          change={data.change}
          icon={Icon}
          iconColor={getIconColorForKPI(key)}
          additionalInfo={data.info}
        />
      );
    });
  };

  // Download handlers
  const downloadChartData = (data: any[], filename: string) => {
    const csvContent = [
      // Headers
      Object.keys(data[0]).join(','),
      // Data rows
      ...data.map(item => Object.values(item).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart download handlers
  const handlePerformanceDownload = () => downloadChartData(performanceData, 'performance_metrics');
  const handleHealthDownload = () => downloadChartData(healthData, 'business_health');
  const handleMarketDownload = () => downloadChartData(marketData, 'market_analysis');
  const handleRiskDownload = () => downloadChartData(riskData, 'risk_assessment');
  const handleOperationalDownload = () => downloadChartData(operationalData, 'operational_metrics');

  return (
    <div className="space-y-6">
      {/* Navigation and Time Range Selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <TimeFrameSelector
          selectedTimeRange={selectedTimeRange}
          onTimeRangeChange={setSelectedTimeRange}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderKPICards()}
      </div>

      {/* Charts Section - Always visible */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Overall Performance"
          subtitle="Revenue, Users, and Growth Trends"
          downloadData={handlePerformanceDownload}
          icon={FiActivity}
          iconColor="blue"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />
              <Line type="monotone" dataKey="growth" stroke="#ffc658" name="Growth %" />
              <Line type="monotone" dataKey="satisfaction" stroke="#ff8042" name="Satisfaction" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Business Health"
          subtitle="Current vs Target Performance"
          downloadData={handleHealthDownload}
          icon={FiTrendingUp}
          iconColor="green"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#8884d8" name="Current" />
              <Bar dataKey="target" fill="#82ca9d" name="Target" />
              <Bar dataKey="efficiency" fill="#ffc658" name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Market Analysis"
          subtitle="Market Position and Trends"
          downloadData={handleMarketDownload}
          icon={FiGlobe}
          iconColor="indigo"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredMarketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="market" stackId="1" stroke="#8884d8" fill="#8884d8" name="Market" />
              <Area type="monotone" dataKey="industry" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Industry" />
              <Area type="monotone" dataKey="company" stackId="3" stroke="#ffc658" fill="#ffc658" name="Company" />
              <Line type="monotone" dataKey="share" stroke="#ff8042" name="Market Share %" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Risk Assessment"
          subtitle="Risk Distribution Analysis"
          downloadData={handleRiskDownload}
          icon={FiShield}
          iconColor="red"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Operational Metrics"
          subtitle="Performance Radar Analysis"
          downloadData={handleOperationalDownload}
          icon={FiActivity}
          iconColor="purple"
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={operationalData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Target" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Current" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tab-specific content */}
      <div className="mt-6">
        {activeTab === 'business' && <BusinessDevelopment />}
        {activeTab === 'supply' && <SupplyChain />}
        {activeTab === 'service' && <CustomerService />}
        {activeTab === 'network' && <Networking />}
        {activeTab === 'design' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Design System</h2>
              <p className="text-gray-600 mb-6">
                View and interact with our design system directly from Figma. This includes our component library,
                style guide, and design patterns.
              </p>
              <FigmaEmbed 
                title="Enterprise Dashboard Design System"
                url="YOUR_FIGMA_FILE_ID_HERE"
                className="h-[800px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
