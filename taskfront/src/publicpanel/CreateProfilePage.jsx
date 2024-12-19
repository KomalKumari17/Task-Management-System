import React, { useState } from 'react';
import axios from 'axios';

const CreateProfilePage = () => {
  const [profileData, setProfileData] = useState({
    bio: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/userprofile/', profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('response.data.token')}`,
        },
      });
      setLoading(false);
      alert('Profile created successfully!');
    } catch (err) {
      setLoading(false);
      setError('Error creating profile. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-lg mt-10">
  <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Create Your Profile</h1>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-blue-700 font-medium mb-2">Bio</label>
      <textarea
        name="bio"
        value={profileData.bio}
        onChange={handleChange}
        className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
        placeholder="Write a short bio about yourself"
        rows="4"
      ></textarea>
    </div>

    <div>
      <label className="block text-blue-700 font-medium mb-2">Contact</label>
      <input
        type="text"
        name="contact"
        value={profileData.contact}
        onChange={handleChange}
        className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter your contact number"
      />
    </div>

    <div>
      <label className="block text-blue-700 font-medium mb-2">Address</label>
      <input
        type="text"
        name="address"
        value={profileData.address}
        onChange={handleChange}
        className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter your address"
      />
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-blue-700 font-medium mb-2">City</label>
        <input
          type="text"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter your city"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-medium mb-2">State</label>
        <input
          type="text"
          name="state"
          value={profileData.state}
          onChange={handleChange}
          className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter your state"
        />
      </div>
    </div>

    <div>
      <label className="block text-blue-700 font-medium mb-2">Country</label>
      <input
        type="text"
        name="country"
        value={profileData.country}
        onChange={handleChange}
        className="w-full p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder="Enter your country"
      />
    </div>

    <button
      type="submit"
      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition duration-300 shadow-md"
      disabled={loading}
    >
      {loading ? 'Creating...' : 'Create Profile'}
    </button>
  </form>

  {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
</div>
  );
};

export default CreateProfilePage;
