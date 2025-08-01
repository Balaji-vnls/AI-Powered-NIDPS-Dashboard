import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BarChartIcon, ShieldIcon, SettingsIcon, AlertTriangleIcon, DatabaseIcon, UserIcon, XIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar
}) => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const navItems = [{
    name: 'Dashboard',
    path: '/',
    icon: HomeIcon
  }, {
    name: 'Threats',
    path: '/threats',
    icon: AlertTriangleIcon
  }, {
    name: 'Data Logs',
    path: '/logs',
    icon: DatabaseIcon
  }, {
    name: 'Analytics',
    path: '/analytics',
    icon: BarChartIcon
  }, {
    name: 'Security Rules',
    path: '/rules',
    icon: ShieldIcon
  }, {
    name: 'Profile',
    path: '/profile',
    icon: UserIcon
  }, {
    name: 'Settings',
    path: '/settings',
    icon: SettingsIcon
  }];
  return <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 md:hidden" onClick={closeSidebar}></div>}
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Sidebar header with close button for mobile */}
          <div className="flex items-center justify-between h-16 px-4 bg-gray-900 md:hidden">
            <div className="flex items-center">
              <ShieldIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-lg font-semibold text-white">
                FORTIFY-NIDPS
              </span>
            </div>
            <button onClick={closeSidebar} className="text-gray-300 hover:text-white">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.path} onClick={closeSidebar} className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${isActive(item.path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                  <Icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                  {item.name}
                </Link>;
          })}
          </nav>
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="text-sm text-gray-400">
                <p>FORTIFY-NIDPS</p>
                <p>v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>;
};
export default Sidebar;