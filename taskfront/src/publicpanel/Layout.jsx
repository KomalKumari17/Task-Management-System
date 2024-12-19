import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col -m-[3%]">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold dark:text-gray-200">My Web App</h1>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden ml-auto">
            <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200 focus:outline-none">
              {menuOpen ? '✖' : '☰'}
            </button>
          </div>

          {/* Navigation Links */}
          <ul className={`md:flex md:space-x-8 space-y-4 md:space-y-0 ${menuOpen ? 'block' : 'hidden'} md:flex-row ml-auto`}>
            <li>
              <Link to="/" className="block hover:text-blue-500 dark:hover:text-blue-400">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login" className="block hover:text-blue-500 dark:hover:text-blue-400">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block hover:text-blue-500 dark:hover:text-blue-400">Register</Link>
                </li>
              </>
            )}
          </ul>

          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span className="hidden md:inline dark:text-gray-200 ml-6">User</span>
                </button>
                {profileOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded shadow-md text-gray-700 dark:text-gray-200">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
