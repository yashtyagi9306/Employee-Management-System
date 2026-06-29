// src/components/other/TaskListNumbers.jsx

import React from 'react'

const statConfig = [
  { key: 'newTask',   label: 'NEW',       dot: '#a78bfa' },
  { key: 'completed', label: 'COMPLETED',  dot: '#34d399' },
  { key: 'active',   label: 'ACCEPTED',   dot: '#60a5fa' },
  { key: 'failed',   label: 'FAILED',     dot: '#f87171' },
]

const TaskListNumbers = ({ employee }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {statConfig.map(({ key, label, dot }) => (
        <div key={key} className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
            <span className="text-[11px] font-semibold tracking-widest text-gray-400">{label}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-medium text-gray-900">
              {String(employee.taskNumbers[key]).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-300 mb-1">tasks</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumbers