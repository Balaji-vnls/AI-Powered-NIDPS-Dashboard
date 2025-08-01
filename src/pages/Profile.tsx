import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserIcon, MailIcon, ShieldIcon, KeyIcon, AlertCircleIcon } from 'lucide-react';
const Profile = () => {
  const {
    user
  } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setNotification({
        type: 'error',
        message: 'New passwords do not match'
      });
      return;
    }
    // Simulate password change
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Password updated successfully'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };
  return <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Profile</h1>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Personal details and application settings
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium text-gray-900">
                {user?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500">
                {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MailIcon className="h-4 w-4 mr-1" />
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.email || 'user@example.com'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <ShieldIcon className="h-4 w-4 mr-1" />
                  Role
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Account Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Change Password
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your account password
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {notification && <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircleIcon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
              </div>
            </div>}
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="current-password" name="current-password" type="password" required className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="new-password" name="new-password" type="password" required className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="confirm-password" name="confirm-password" type="password" required className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Security Settings
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account security preferences
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="two-factor" name="two-factor" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="two-factor" className="font-medium text-gray-700">
                  Enable Two-Factor Authentication
                </label>
                <p className="text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="login-alerts" name="login-alerts" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="login-alerts" className="font-medium text-gray-700">
                  Login Alerts
                </label>
                <p className="text-gray-500">
                  Receive email notifications for new login attempts
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="session-timeout" name="session-timeout" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="session-timeout" className="font-medium text-gray-700">
                  Automatic Session Timeout
                </label>
                <p className="text-gray-500">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;