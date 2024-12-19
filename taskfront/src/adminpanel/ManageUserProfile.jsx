import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUserProfile = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          window.location.href = '/login';
          setError('No token found, please log in.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/admin/userprofile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setUserProfiles(response.data); // Set user profiles array
        } else {
          setError('No user profiles found.');
        }
      } catch (err) {
        console.error('API Error: ', err.response ? err.response.data : err.message);
        setError('Error fetching user profiles. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfiles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto m-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Profile Image</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Contact</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">State</th>
            <th scope="col" className="px-6 py-3">Country</th>
            <th scope="col" className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.length > 0 ? (
            userProfiles.map((user) => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  <img
                    src={user.profile_image}
                    alt={`${user.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.contact}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4">{user.city}</td>
                <td className="px-6 py-4">{user.state}</td>
                <td className="px-6 py-4">{user.country}</td>
                <td className="px-6 py-4">{new Date(user.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center">
                No user profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUserProfile;
