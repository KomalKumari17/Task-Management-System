import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './publicpanel/Home';
import Layout from './publicpanel/Layout';
import Login from './Login';
import Register from './Register';
import ProfilePage from './publicpanel/ProfilePage';
import CreateProfilePage from './publicpanel/CreateProfilePage';
import AdminLayout from './adminpanel/AdminLayout';
import AdminDashboard from './adminpanel/AdminDashboard';
import AdminSidebar from './adminpanel/AdminSidebar';
import ManageTask from './adminpanel/ManageTask';
import ManageUser from './adminpanel/ManageUser';
import ManageUserProfile from './adminpanel/ManageUserProfile';
import Navbar from './adminpanel/navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="createprofile" element={<CreateProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="sidebar" element={<AdminSidebar />} />
          <Route path="navbar" element={<Navbar />} />
          <Route path="manage-task" element={<ManageTask />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-user-profile" element={<ManageUserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

