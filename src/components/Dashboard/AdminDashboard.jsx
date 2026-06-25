import React from 'react'
import Header from '../other/Header.jsx' 
import CreateTask from '../other/CreateTask.jsx'
import AllTask from '../other/AllTask.jsx'
const AdminDashboard = ({data}) => {
  return (
    <div className="h-screen w-full bg-[#1c1c1c] px-10 py-6">
        <Header data={data} />
        <CreateTask />
        <AllTask />

    </div>
  )
}

export default AdminDashboard