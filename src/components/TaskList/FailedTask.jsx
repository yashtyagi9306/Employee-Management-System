// src/components/TaskList/FailedTask.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Calendar } from 'lucide-react'

const FailedTask = ({ data, employeeId, taskId }) => {
  const { reopenTask } = useContext(AuthContext)

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4 flex flex-col gap-3"
      style={{ borderLeftColor: '#f87171' }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-red-50 text-red-400 tracking-widest uppercase">
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
        onClick={() => reopenTask(employeeId, taskId)}
        className="mt-auto w-full py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
      >
        Reopen Task
      </button>
    </div>
  )
}

export default FailedTask