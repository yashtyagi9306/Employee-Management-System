// src/components/TaskList/ActiveTask.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Calendar } from 'lucide-react'

const ActiveTask = ({ data, employeeId, taskId }) => {
  const { completeTask, failTask } = useContext(AuthContext)

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4 flex flex-col gap-3"
      style={{ borderLeftColor: '#60a5fa' }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-400 tracking-widest uppercase">
          {data.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar size={12} /> {data.taskDate}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-base mb-1">{data.taskTitle}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{data.taskDescription}</p>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <button
          onClick={() => completeTask(employeeId, taskId)}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}
        >
          Mark complete
        </button>
        <button
          onClick={() => failTask(employeeId, taskId)}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
        >
          Mark failed
        </button>
      </div>
    </div>
  )
}

export default ActiveTask