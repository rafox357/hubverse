import React from 'react';
import { FiTruck, FiPackage, FiAlertCircle } from 'react-icons/fi';
import ChartCard from '../Dashboard/ChartCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SupplyChain: React.FC = () => {
  const inventoryData = [
    { category: 'Raw Materials', inStock: 75, onOrder: 25, critical: 5 },
    { category: 'Work in Progress', inStock: 60, onOrder: 30, critical: 10 },
    { category: 'Finished Goods', inStock: 85, onOrder: 15, critical: 0 },
    { category: 'Packaging', inStock: 90, onOrder: 10, critical: 0 },
  ];

  const supplierPerformance = [
    { supplier: 'Supplier A', deliveryRate: 98, qualityScore: 95, responseTime: 92 },
    { supplier: 'Supplier B', deliveryRate: 95, qualityScore: 92, responseTime: 88 },
    { supplier: 'Supplier C', deliveryRate: 90, qualityScore: 88, responseTime: 85 },
    { supplier: 'Supplier D', deliveryRate: 85, qualityScore: 90, responseTime: 95 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Inventory Status"
          subtitle="Current inventory levels and orders"
          downloadData={() => console.log('Downloading inventory data')}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" fill="#82ca9d" name="In Stock" />
              <Bar dataKey="onOrder" fill="#8884d8" name="On Order" />
              <Bar dataKey="critical" fill="#ff8042" name="Critical Level" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Supplier Performance"
          subtitle="Key metrics for supplier evaluation"
          downloadData={() => console.log('Downloading supplier data')}
        >
          <div className="space-y-4">
            {supplierPerformance.map((supplier) => (
              <div key={supplier.supplier} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{supplier.supplier}</h4>
                  <span className="text-sm text-blue-600">
                    {Math.round((supplier.deliveryRate + supplier.qualityScore + supplier.responseTime) / 3)}% overall
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-green-600 font-semibold">{supplier.deliveryRate}%</div>
                    <div className="text-xs text-gray-500">Delivery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold">{supplier.qualityScore}%</div>
                    <div className="text-xs text-gray-500">Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600 font-semibold">{supplier.responseTime}%</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default SupplyChain;
