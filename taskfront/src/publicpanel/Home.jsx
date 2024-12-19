import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token"); 
      if (!token) {
        window.location.href = "/login";
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
        setError("Please ensure you are logged in.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [navigate]);

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("access_token"); 
    if (!token) {
      window.location.href = '/login'
      setError("No token found. Please log in.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id)); 
    } catch (err) {
      console.error(err);
      setError("Error deleting task.");
    }
  };

  const handleViewTask = (id) => {
    navigate(`/tasks/${id}`);
  };

  if (loading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">Task Management</h1>

      {error && (
        <div className="bg-red-600 text-white p-2 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-white shadow-lg p-4 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-gray-500">{task.description}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleViewTask(task.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
