import React, { useEffect, useState } from 'react';
import { AlertTriangleIcon, ShieldIcon, WifiIcon, ServerIcon } from 'lucide-react';
interface Threat {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
}
interface ThreatFeedProps {
  refreshTrigger: number;
}
const ThreatFeed: React.FC<ThreatFeedProps> = ({
  refreshTrigger
}) => {
  const [threats, setThreats] = useState<Threat[]>([]);
  // Generate mock threat data
  useEffect(() => {
    const generateMockThreats = () => {
      const threatTypes = ['Port Scan', 'DDoS Attempt', 'SQL Injection', 'Brute Force', 'Malware Communication', 'Suspicious Login', 'Data Exfiltration'];
      const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
      const generateIp = () => {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      };
      const generateTimestamp = () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
        return date.toISOString();
      };
      const mockThreats: Threat[] = [];
      for (let i = 0; i < 5; i++) {
        const type = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        mockThreats.push({
          id: `threat-${Date.now()}-${i}`,
          timestamp: generateTimestamp(),
          sourceIp: generateIp(),
          destinationIp: generateIp(),
          type,
          severity,
          details: `Detected ${type.toLowerCase()} attempt from suspicious source.`
        });
      }
      // Sort by timestamp (newest first)
      mockThreats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setThreats(mockThreats);
    };
    generateMockThreats();
  }, [refreshTrigger]);
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getTypeIcon = (type: string) => {
    if (type.includes('Port Scan') || type.includes('DDoS')) {
      return <WifiIcon className="h-5 w-5" />;
    } else if (type.includes('SQL') || type.includes('Injection')) {
      return <ServerIcon className="h-5 w-5" />;
    } else {
      return <ShieldIcon className="h-5 w-5" />;
    }
  };
  return <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {threats.length > 0 ? threats.map(threat => <li key={threat.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-1 rounded-md ${getSeverityColor(threat.severity)}`}>
                  {getTypeIcon(threat.type)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {threat.type}
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>{threat.details}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span>Source: {threat.sourceIp}</span>
                      <span className="mx-1">→</span>
                      <span>Destination: {threat.destinationIp}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(threat.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            </li>) : <li className="p-4 text-center">
            <div className="flex flex-col items-center py-6">
              <AlertTriangleIcon className="h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                No threats detected at this time.
              </p>
            </div>
          </li>}
      </ul>
    </div>;
};
export default ThreatFeed;