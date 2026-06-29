// src/components/Dashboard/EmployeeDashboard.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'
import { LayoutDashboard, ListChecks, LogOut, Sparkles } from 'lucide-react'
import TaskListNumbers from '../other/TaskListNumbers.jsx'
import TaskList from '../TaskList/TaskList.jsx'

const EmployeeDashboard = () => {
  const { userData, loggedInUser, logout } = useContext(AuthContext)
  const [activeNav, setActiveNav] = useState('dashboard')

  const currentEmployee = userData.find(emp => emp.id === loggedInUser?.id)
  if (!loggedInUser || !currentEmployee) return null

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: '#f4f3ff' }}>

      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 bg-white flex flex-col justify-between py-6 px-4 border-r border-gray-100">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)' }}>
              <Sparkles size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">Bloom EMS</p>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Workspace</p>
            </div>
          </div>

          {/* Nav */}
          <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase px-2 mb-3">
            Workspace
          </p>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors ${
                activeNav === 'dashboard'
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard size={17} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveNav('tasks')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors ${
                activeNav === 'tasks'
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ListChecks size={17} />
              My Tasks
            </button>
          </nav>
        </div>

        {/* Employee info at bottom */}
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-gray-50">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)' }}>
            {currentEmployee.firstName[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 leading-tight">{currentEmployee.firstName}</p>
            <p className="text-xs text-gray-400">Team member</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div>
            <p className="text-sm text-gray-400">Hello,</p>
            <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {currentEmployee.firstName} <span>✨</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <TaskListNumbers employee={currentEmployee} />
          <TaskList employee={currentEmployee} />
        </div>

      </div>
    </div>
  )
}

export default EmployeeDashboard