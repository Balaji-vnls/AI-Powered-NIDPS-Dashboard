import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCwIcon } from 'lucide-react';
interface TrafficStatsProps {
  refreshTrigger: number;
}
const TrafficStats: React.FC<TrafficStatsProps> = ({
  refreshTrigger
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const generateData = () => {
      setLoading(true);
      // Generate mock data for traffic stats
      const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS'];
      const mockData = protocols.map(protocol => ({
        name: protocol,
        count: Math.floor(Math.random() * 1000) + 100
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
      const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS'];
      const mockData = protocols.map(protocol => ({
        name: protocol,
        count: Math.floor(Math.random() * 1000) + 100
      }));
      setData(mockData);
      setLoading(false);
    }, 800);
  };
  return <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Network Traffic by Protocol
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
            <BarChart data={data} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={value => [`${value} packets`, 'Count']} labelFormatter={label => `Protocol: ${label}`} />
              <Bar dataKey="count" fill="#3b82f6" barSize={40} />
            </BarChart>
          </ResponsiveContainer>}
      </div>
    </div>;
};
export default TrafficStats;