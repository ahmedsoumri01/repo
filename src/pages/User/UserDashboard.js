import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Redirect to login page
    window.location.href = '/auth/login';
  };
useEffect(() => {
    // Check user role when the component mounts
    const userType = localStorage.getItem('userType');

    if (userType !== 'USER' && userType === 'ADMIN') {
      // Redirect to the login page if the user is not an admin
      window.location.href = '/admin/dashboard';
    }
  }, []);
  return (
    <div>
    
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4  ml-4 mt-4"
      >
        Logout
      </button>

      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">User Dashboard</h1>

        {/* Button to redirect to user profile */}
        <Link to="/user/profile" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Your Profile
        </Link>

        {/* Button to redirect to "Point Your Day" */}
        <Link to="/user/point-your-day" className="bg-green-500 text-white px-4 py-2 rounded">
          Point Your Day
        </Link>
      </div>
    </div>
  );
}
