import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
  
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/login/", formData);
      console.log("API Response:", response.data);
  
      const accessToken = response.data?.token;
      const refreshToken = response.data?.refresh;
      const isStaff = response.data?.user?.is_staff; // Now, is_staff is part of the response
  
      if (accessToken && refreshToken) {
        setSuccessMessage("Login Successful!");
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
  
        // Redirect based on user role
        if (isStaff) {
          navigate('/admin'); // Redirect to Admin Dashboard if is_staff is true
        } else {
          navigate('/'); // Redirect to Home Page if not an admin
        }
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      // Check if response exists and log accordingly
      if (err.response) {
        // Log and display the error message if available
        console.error("Error during Login:", err.response?.data);
        if (err.response.data) {
          const errorMessage = err.response.data.message || Object.values(err.response.data).flat().join(", ");
          setError(errorMessage);
        } else {
          setError("Unexpected error occurred.");
        }
      } else {
        // Handle cases where there is no response (e.g., network failure)
        console.error("Error during Login (no response):", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-gradient-to-r from-indigo-200 to-sky-400">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 py-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 mr-auto">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg focus:outline-none disabled:bg-blue-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
