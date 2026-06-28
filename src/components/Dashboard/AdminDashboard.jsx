// src/components/Dashboard/AdminDashboard.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'
import Header from '../other/Header.jsx'
import CreateTask from '../other/CreateTask.jsx'
import AllTask from '../other/AllTask.jsx'

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="h-screen w-full bg-[#1c1c1c] px-10 py-6">
      <Header userName="Admin" onLogout={logout} />
      <CreateTask />
      <AllTask />
    </div>
  )
}

export default AdminDashboard