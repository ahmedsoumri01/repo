import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     // Check user role when the component mounts
     const userType = localStorage.getItem('userType');

     if (userType !== 'ADMIN' && userType === 'USER') {
       // Redirect to the login page if the user is not an admin
       window.location.href = '/user/dashboard';
     }
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        // Make sure a token is available before making the request
        if (!token) {
          throw new Error('No token available');
        }

        const response = await axios.get(`http://localhost:8080/api/v1/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      // Make sure a token is available before making the request
      if (!token) {
        throw new Error('No token available');
      }

      // Send a PUT request to update the user
      await axios.put(
        `http://localhost:8080/api/v1/admin/update-user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('User updated successfully');
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Edit User</h1>

      
      <form>
      <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <input
          disabled={true}
            type="text"
            id="role"
            name="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
          <Link to="/admin/all-users" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Return to All Users
          </Link>
          <Link to="/admin/dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Return to Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
