// src/App.jsx

import React, { useContext } from 'react'
import Login from './components/Auth/Login.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx'
import { AuthContext } from './context/AuthProvider.jsx'

function App() {
  const { loggedInUser, login } = useContext(AuthContext)

  const handleLogin = (email, password) => {
    const success = login(email, password)
    if (!success) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="App">
      {!loggedInUser && <Login handleLogin={handleLogin} />}
      {loggedInUser?.role === 'admin' && <AdminDashboard />}
      {loggedInUser?.role === 'employee' && <EmployeeDashboard />}
    </div>
  )
}

export default App