import React from 'react';
import { Link } from 'react-router-dom';

const ForgetPass = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-semibold mb-4">Forget Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-4"
        >
          Reset Password
        </button>
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPass;
