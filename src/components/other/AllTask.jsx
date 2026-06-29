// src/components/other/AllTask.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const badge = (value, color) => {
  if (value === 0) return <span className="text-sm text-gray-300">0</span>
  const styles = {
    purple: 'bg-purple-100 text-purple-500',
    blue:   'bg-blue-100 text-blue-500',
    green:  'bg-green-100 text-green-500',
    red:    'bg-red-100 text-red-500',
  }
  return (
    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${styles[color]}`}>
      {value}
    </span>
  )
}

const AllTask = () => {
  const { userData } = useContext(AuthContext)

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Team performance</h2>
      <p className="text-sm text-gray-400 mb-5">Workload distribution at a glance.</p>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {['Employee', 'New', 'Active', 'Completed', 'Failed'].map((col) => (
              <th key={col}
                className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase pb-3 text-left first:w-1/2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((emp) => (
            <tr key={emp.id} className="border-b border-gray-50 last:border-0">
              <td className="py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)' }}>
                    {emp.firstName[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{emp.firstName}</span>
                </div>
              </td>
              <td className="py-3.5">{badge(emp.taskNumbers.newTask,   'purple')}</td>
              <td className="py-3.5">{badge(emp.taskNumbers.active,    'blue')}</td>
              <td className="py-3.5">{badge(emp.taskNumbers.completed, 'green')}</td>
              <td className="py-3.5">{badge(emp.taskNumbers.failed,    'red')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllTask