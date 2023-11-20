import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  useEffect(() => {
    // Check user role when the component mounts
    const userType = localStorage.getItem('userType');

    if (userType !== 'ADMIN' && userType === 'USER') {
      // Redirect to the login page if the user is not an admin
      window.location.href = '/user/dashboard';
    }
  }, []);

  const handleLogout = () => {
    // Clear all items saved in localStorage
    localStorage.clear();

    // Redirect to the login page
    window.location.href = '/auth/login';
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link to="/admin/profile" className="bg-blue-500 text-white px-4 py-2 rounded" >
          Admin Profile
        </Link>

        <Link to="/admin/all-users" className="bg-green-500 text-white px-4 py-2 rounded">
          All Users
        </Link>
        <Link to="/admin/check-point" className="bg-red-500 text-white px-4 py-2 rounded">
          Check Point
        </Link>
      </div>
    </div>
  );
}
