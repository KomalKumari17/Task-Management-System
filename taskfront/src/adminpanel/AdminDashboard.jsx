import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    tasks: 0,
    users: 0,
    userProfiles: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const [userProfilesRes, tasksRes, usersRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/admin/userprofile/"),
        fetch("http://127.0.0.1:8000/api/admin/task/"),
        fetch("http://127.0.0.1:8000/api/admin/user/"),
      ]);

      if (!userProfilesRes.ok || !tasksRes.ok || !usersRes.ok) {
        throw new Error("Failed to fetch data from one or more endpoints");
      }

      const userProfiles = await userProfilesRes.json();
      const tasks = await tasksRes.json();
      const users = await usersRes.json();

      // Assuming the APIs return an array, count their length
      setStats({
        tasks: tasks.count,
        users: users.count,
        userProfiles: userProfiles.count,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none">
          Toggle Theme
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Task Count */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Total Tasks</h2>
          <p className="text-4xl font-bold">{stats.tasks}</p>
          <p className="text-gray-500 dark:text-gray-400">Completed and Pending</p>
        </div>

        {/* User Count */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Total Users</h2>
          <p className="text-4xl font-bold">{stats.users}</p>
          <p className="text-gray-500 dark:text-gray-400">Registered in the system</p>
        </div>

        {/* User Profile Count */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">User Profiles</h2>
          <p className="text-4xl font-bold">{stats.userProfiles}</p>
          <p className="text-gray-500 dark:text-gray-400">Profiles created</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
