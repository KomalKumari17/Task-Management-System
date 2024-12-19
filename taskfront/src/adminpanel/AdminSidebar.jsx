import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation(); // Hook to get the current route path

  return (
    <div className="flex flex-col h-screen bg-gray-800 px-6 fixed -ml-3 z-50">
      <div className="text-2xl text-gray-200 font-bold p-6">
        Task App
      </div>

      {/* Dashboard Link */}
      <Link
        to="/admin"
        className={`flex items-center px-4 py-3 gap-2 text-gray-200 hover:bg-slate-700 hover:text-white ${
          location.pathname === '/admin' ? 'bg-slate-500 text-white' : ''
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
        Dashboard
      </Link>

      {/* Manage User Link */}
      <Link
        to="/admin/manage-user"
        className={`flex items-center px-4 py-3 gap-2 text-gray-200 hover:bg-slate-700 hover:text-white ${
          location.pathname === '/admin/manage-user' ? 'bg-slate-500 text-white' : ''
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        Manage User
      </Link>

      {/* Manage Task Link */}
      <Link
        to="/admin/manage-task"
        className={`flex items-center px-4 py-3 gap-2 text-gray-200 hover:bg-slate-700 hover:text-white ${
          location.pathname === '/admin/manage-task' ? 'bg-slate-500 text-white' : ''
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
          <path
            fillRule="evenodd"
            d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
            clipRule="evenodd"
          />
        </svg>
        Manage Task
      </Link>

      {/* Manage User Profile Link */}
      <Link
        to="/admin/manage-user-profile"
        className={`flex items-center px-4 py-3 gap-2 text-gray-200 hover:bg-slate-700 hover:text-white ${
          location.pathname === '/admin/manage-user-profile' ? 'bg-slate-500 text-white' : ''
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
            clipRule="evenodd"
          />
        </svg>
        Manage User Profile
      </Link>
    </div>
  );
};

export default AdminSidebar;
