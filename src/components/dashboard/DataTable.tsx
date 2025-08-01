import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, DownloadIcon } from 'lucide-react';
interface LogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  port: number;
  bytes: number;
  packets: number;
  flags: string;
  status: 'normal' | 'suspicious' | 'malicious';
}
interface DataTableProps {
  refreshTrigger: number;
}
const DataTable: React.FC<DataTableProps> = ({
  refreshTrigger
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'normal' | 'suspicious' | 'malicious'>('all');
  // Generate mock log data
  useEffect(() => {
    const generateMockLogs = () => {
      const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS'];
      const statuses: ('normal' | 'suspicious' | 'malicious')[] = ['normal', 'suspicious', 'malicious'];
      const flagOptions = ['SYN', 'ACK', 'FIN', 'RST', 'PSH', 'URG'];
      const generateIp = () => {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      };
      const generateTimestamp = () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
        return date.toISOString();
      };
      const generateFlags = () => {
        const count = Math.floor(Math.random() * 3) + 1;
        const flags = [];
        for (let i = 0; i < count; i++) {
          flags.push(flagOptions[Math.floor(Math.random() * flagOptions.length)]);
        }
        return [...new Set(flags)].join('/');
      };
      const mockLogs: LogEntry[] = [];
      for (let i = 0; i < 20; i++) {
        const protocol = protocols[Math.floor(Math.random() * protocols.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        mockLogs.push({
          id: `log-${Date.now()}-${i}`,
          timestamp: generateTimestamp(),
          sourceIp: generateIp(),
          destinationIp: generateIp(),
          protocol,
          port: Math.floor(Math.random() * 65535) + 1,
          bytes: Math.floor(Math.random() * 10000),
          packets: Math.floor(Math.random() * 100) + 1,
          flags: protocol === 'TCP' ? generateFlags() : '-',
          status
        });
      }
      // Sort by timestamp (newest first)
      mockLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setLogs(mockLogs);
    };
    generateMockLogs();
  }, [refreshTrigger]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'suspicious':
        return 'bg-yellow-100 text-yellow-800';
      case 'malicious':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // Filter logs based on search term and status filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.sourceIp.includes(searchTerm) || log.destinationIp.includes(searchTerm) || log.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div>
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="w-full sm:w-64 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search IP or protocol..." className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <select className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="suspicious">Suspicious</option>
              <option value="malicious">Malicious</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <DownloadIcon className="h-4 w-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source IP
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination IP
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Port
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bytes
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length > 0 ? filteredLogs.map(log => <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.sourceIp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.destinationIp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.protocol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.bytes.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
                </tr>) : <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No logs found matching your criteria
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredLogs.length}</span> of{' '}
          <span className="font-medium">{logs.length}</span> logs
        </div>
        <div className="flex-1 flex justify-end">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <span>&laquo;</span>
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
              2
            </span>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <span>&raquo;</span>
            </a>
          </nav>
        </div>
      </div>
    </div>;
};
export default DataTable;