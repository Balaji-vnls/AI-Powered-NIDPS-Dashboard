import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldIcon, MailIcon } from 'lucide-react';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    resetPassword
  } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result) {
        setSuccess(true);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-4 px-6 flex items-center justify-center">
          <ShieldIcon className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white ml-2">FORTIFY-NIDPS</h1>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Reset your password
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>}
          {success ? <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p className="font-medium">Reset link sent!</p>
              <p className="mt-1">
                Check your email for instructions to reset your password.
              </p>
              <div className="mt-4">
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Return to login
                </Link>
              </div>
            </div> : <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="email" type="email" className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Back to login
                </Link>
              </div>
            </form>}
        </div>
      </div>
    </div>;
};
export default ForgotPassword;