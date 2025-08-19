import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const AdminAccounts = () => {
  const { axios } = useAppContext();
  const [adminAccounts, setAdminAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminAccounts();
  }, []);

  const fetchAdminAccounts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/admin-accounts');
      
      if (data.success) {
        setAdminAccounts(data.adminAccounts);
      } else {
        toast.error('Failed to fetch admin accounts');
      }
    } catch (error) {
      console.error('Error fetching admin accounts:', error);
      toast.error('Failed to fetch admin accounts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Admin Accounts</h2>
        <button
          onClick={fetchAdminAccounts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminAccounts.map((admin, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {admin.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {admin.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {admin.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Login Credentials:</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Super Admin:</strong> admin@vedified.com / admin123</p>
          <p><strong>Content Editor:</strong> editor@vedified.com / editor123</p>
          <p><strong>Blog Manager:</strong> manager@vedified.com / manager123</p>
          <p><strong>Test Account:</strong> test@vedified.com / test123</p>
          <p><strong>Demo User:</strong> demo@vedified.com / demo123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAccounts;
