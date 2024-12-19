import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTask = () => {
  const [task, setTask] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          window.location.href = '/login';
          setError('No token found, please log in.');
          setLoading(false);
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/api/admin/task/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setTask(response.data); // Set tasks array
        } else {
          setError('No Task found.');
        }
      } catch (err) {
        console.error('API Error: ', err.response ? err.response.data : err.message);
        setError('Error fetching task. Please try again');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto m-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Task Title</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Completed</th>
            <th scope="col" className="px-6 py-3">Assigned User</th>
            <th scope="col" className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody className=''>
          {task.length > 0 ? (
            task.map((t) => (
              <tr key={t.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {t.title}
                </td>
                <td className="px-6 py-4">{t.description}</td>
                <td className="px-6 py-4">{t.is_completed ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">{t.assigned_user.username}</td>
                <td className="px-6 py-4">{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTask;
