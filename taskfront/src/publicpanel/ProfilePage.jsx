import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          navigate("/login") 
          setError("No token found, please log in.");
          setLoading(false);
          return;
        }
  
        const response = await axios.get('http://127.0.0.1:8000/api/admin/userprofile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.data) {
          setProfile(response.data[0]); 
        } else {
          setError("No profile data found.");
        }
      } catch (err) {
        console.error("API Error: ", err.response ? err.response.data : err.message);
        setError("Error fetching profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <img
            src={profile?.profile_image ? profile.profile_image : '/path/to/default-image.jpg'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
          />
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{profile?.username}</h1>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">Bio:</p>
          <p className="text-gray-800">{profile?.bio || "No bio available"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">Contact:</p>
          <p className="text-gray-800">{profile?.contact || "No contact information"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">Address:</p>
          <p className="text-gray-800">{profile?.address || "No address available"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">City:</p>
          <p className="text-gray-800">{profile?.city || "No city information"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">State:</p>
          <p className="text-gray-800">{profile?.state || "No state information"}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-600">Country:</p>
          <p className="text-gray-800">{profile?.country || "No country information"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
