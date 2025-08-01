import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ShieldIcon, MenuIcon, BellIcon, UserIcon } from 'lucide-react';
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({
  toggleSidebar
}) => {
  const {
    user,
    logout
  } = useContext(AuthContext);
  return <header className="bg-white shadow z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button onClick={toggleSidebar} className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <ShieldIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                FORTIFY-NIDPS
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </div>
            <div className="ml-3 relative">
              <div className="flex items-center">
                <Link to="/profile" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                    {user?.name || 'User'}
                  </span>
                </Link>
                <button onClick={logout} className="ml-4 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 focus:outline-none">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;