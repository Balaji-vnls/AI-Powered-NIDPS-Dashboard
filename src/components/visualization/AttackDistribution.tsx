import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RefreshCwIcon } from 'lucide-react';
interface AttackDistributionProps {
  refreshTrigger: number;
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B', '#6BCB77'];
const AttackDistribution: React.FC<AttackDistributionProps> = ({
  refreshTrigger
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const generateData = () => {
      setLoading(true);
      // Generate mock data for attack distribution
      const attackTypes = ['Port Scan', 'DDoS', 'SQL Injection', 'Brute Force', 'Malware', 'XSS', 'Phishing'];
      const mockData = attackTypes.map(type => ({
        name: type,
        value: Math.floor(Math.random() * 100) + 1
      }));
      // Simulate API delay
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 800);
    };
    generateData();
  }, [refreshTrigger]);
  const handleRefresh = () => {
    setData([]);
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const attackTypes = ['Port Scan', 'DDoS', 'SQL Injection', 'Brute Force', 'Malware', 'XSS', 'Phishing'];
      const mockData = attackTypes.map(type => ({
        name: type,
        value: Math.floor(Math.random() * 100) + 1
      }));
      setData(mockData);
      setLoading(false);
    }, 800);
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Attack Type Distribution
        </h3>
        <button onClick={handleRefresh} className={`p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'animate-spin' : ''}`}>
          <span className="sr-only">Refresh</span>
          <RefreshCwIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4 h-72">
        {loading ? <div className="h-full flex items-center justify-center">
            <div className="text-gray-500">Loading data...</div>
          </div> : <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
            name,
            percent
          }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} incidents`, name]} labelFormatter={() => 'Attack Type'} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>}
      </div>
    </div>;
};
export default AttackDistribution;