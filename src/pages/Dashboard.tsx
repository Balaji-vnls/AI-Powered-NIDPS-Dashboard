import React, { useState } from 'react';
import AlertArea from '../components/dashboard/AlertArea';
import ThreatFeed from '../components/dashboard/ThreatFeed';
import UploadInterface from '../components/dashboard/UploadInterface';
import DataTable from '../components/dashboard/DataTable';
import TrafficStats from '../components/visualization/TrafficStats';
import AttackDistribution from '../components/visualization/AttackDistribution';
const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // Function to trigger refresh of components after file upload
  const handleDataUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Network Security Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AlertArea />
        </div>
        <div>
          <UploadInterface onDataUploaded={handleDataUploaded} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrafficStats refreshTrigger={refreshTrigger} />
        <AttackDistribution refreshTrigger={refreshTrigger} />
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Live Threat Feed
          </h3>
        </div>
        <ThreatFeed refreshTrigger={refreshTrigger} />
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Network Traffic Logs
          </h3>
        </div>
        <DataTable refreshTrigger={refreshTrigger} />
      </div>
    </div>;
};
export default Dashboard;