import React, { useEffect, useState } from 'react';
import { ShieldIcon, ShieldAlertIcon, ShieldOffIcon, AlertCircleIcon } from 'lucide-react';
type AlertStatus = 'safe' | 'warning' | 'critical';
const AlertArea = () => {
  const [status, setStatus] = useState<AlertStatus>('safe');
  const [alerts, setAlerts] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  // Simulate changing alert statuses
  useEffect(() => {
    const updateStatus = () => {
      const random = Math.random();
      if (random < 0.7) {
        setStatus('safe');
        setAlerts(0);
      } else if (random < 0.9) {
        setStatus('warning');
        setAlerts(Math.floor(Math.random() * 5) + 1);
      } else {
        setStatus('critical');
        setAlerts(Math.floor(Math.random() * 10) + 5);
      }
      setLastUpdated(new Date().toLocaleTimeString());
    };
    updateStatus();
    const interval = setInterval(updateStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);
  const getStatusConfig = () => {
    switch (status) {
      case 'safe':
        return {
          icon: ShieldIcon,
          color: 'text-green-500',
          bg: 'bg-green-100',
          border: 'border-green-200',
          title: 'Network Secure',
          description: 'No threats detected. Your network is currently secure.'
        };
      case 'warning':
        return {
          icon: ShieldAlertIcon,
          color: 'text-yellow-500',
          bg: 'bg-yellow-100',
          border: 'border-yellow-200',
          title: 'Potential Threats Detected',
          description: `${alerts} suspicious activities detected. Monitoring in progress.`
        };
      case 'critical':
        return {
          icon: ShieldOffIcon,
          color: 'text-red-500',
          bg: 'bg-red-100',
          border: 'border-red-200',
          title: 'Critical Security Alert',
          description: `${alerts} active threats detected! Immediate action required.`
        };
    }
  };
  const config = getStatusConfig();
  const Icon = config.icon;
  return <div className={`${config.bg} ${config.border} border rounded-lg shadow-sm p-6`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-full ${config.bg} ${config.color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="ml-4 flex-1">
          <h2 className={`text-xl font-semibold ${config.color}`}>
            {config.title}
          </h2>
          <p className="mt-1 text-gray-600">{config.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${status === 'safe' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className="ml-2 text-sm text-gray-500">
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </div>
          </div>
          {status !== 'safe' && <div className="mt-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <AlertCircleIcon className="h-4 w-4 mr-2" />
                View Threats
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
export default AlertArea;