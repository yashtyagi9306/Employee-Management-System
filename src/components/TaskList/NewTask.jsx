// src/components/TaskList/NewTask.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Calendar } from 'lucide-react'

const NewTask = ({ data, employeeId, taskId }) => {
  const { acceptTask } = useContext(AuthContext)

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4 flex flex-col gap-3"
      style={{ borderLeftColor: ' #a78bfa' }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-400 tracking-widest uppercase">
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
      <button
        onClick={() => acceptTask(employeeId, taskId)}
        className="mt-auto w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)' }}
      >
        Accept Task
      </button>
    </div>
  )
}

export default NewTask