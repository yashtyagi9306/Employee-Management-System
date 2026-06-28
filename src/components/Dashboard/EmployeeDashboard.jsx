// src/components/Dashboard/EmployeeDashboard.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'
import Header from '../other/Header.jsx'
import TaskListNumbers from '../other/TaskListNumbers.jsx'
import TaskList from '../TaskList/TaskList.jsx'

const EmployeeDashboard = () => {
  const { userData, loggedInUser, logout } = useContext(AuthContext)

  const currentEmployee = userData.find(emp => emp.id === loggedInUser?.id)

  if (!currentEmployee) return null

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header userName={currentEmployee.firstName} onLogout={logout} />
      <TaskListNumbers employee={currentEmployee} />
      <TaskList employee={currentEmployee} />
    </div>
  )
}

export default EmployeeDashboard