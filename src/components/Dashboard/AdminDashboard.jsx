// src/components/Dashboard/AdminDashboard.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'
import {
  LayoutDashboard, ListChecks, Users, Settings,
  Sparkles, LogOut, Plus, Lightbulb
} from 'lucide-react'
import CreateTask from '../other/CreateTask.jsx'
import AllTask from '../other/AllTask.jsx'

const NAV = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'tasks',     label: 'Tasks',     icon: ListChecks },
  { id: 'team',      label: 'Team',      icon: Users },
  { id: 'settings',  label: 'Settings',  icon: Settings },
]

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext)
  const [activeNav, setActiveNav] = useState('overview')

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
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Admin</p>
            </div>
          </div>

          {/* Nav */}
          <p className="text-[11px] text-gray-400 font-semibold tracking-widest uppercase px-2 mb-3">
            Workspace
          </p>
          <nav className="flex flex-col gap-1">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors ${
                  activeNav === id
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Admin info at bottom */}
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-gray-50">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)' }}>
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 leading-tight">Admin</p>
            <p className="text-xs text-gray-400">Administrator</p>
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
              Admin <span>✨</span>
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
          <div className="flex gap-6">

            {/* Left — Create Task form */}
            <div className="flex-1 bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Create a task</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Assign work in a few keystrokes.</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)' }}>
                  <Plus size={18} color="white" />
                </div>
              </div>
              <CreateTask />
            </div>

            {/* Right — Tip + Team pulse */}
            <div className="w-72 shrink-0 flex flex-col gap-4">

              {/* Tip of the day */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                style={{ background: 'linear-gradient(135deg, #fdf4ff, #fce7f3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-purple-400" />
                  <p className="text-sm font-bold text-gray-700">Tip of the day</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Keep task titles short and outcome-led — your team will scan and prioritise faster.
                </p>
              </div>

              {/* Team pulse */}
              <TeamPulse />

            </div>
          </div>

          {/* Team performance table */}
          <div className="mt-6">
            <AllTask />
          </div>
        </div>

      </div>
    </div>
  )
}

// Small inline component — reads from Context directly
const TeamPulse = () => {
  const { userData } = useContext(AuthContext)

  const activeMembers = userData.length
  const openTasks = userData.reduce(
    (sum, emp) => sum + emp.taskNumbers.newTask + emp.taskNumbers.active, 0
  )
  const completedTasks = userData.reduce(
    (sum, emp) => sum + emp.taskNumbers.completed, 0
  )

  const stats = [
    { label: 'Active members',      value: activeMembers },
    { label: 'Open tasks',          value: openTasks },
    { label: 'Completed this cycle', value: completedTasks },
  ]

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <p className="text-sm font-bold text-gray-700 mb-4">Team pulse</p>
      <div className="flex flex-col gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{label}</span>
            <span className="text-sm font-bold text-purple-500">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard