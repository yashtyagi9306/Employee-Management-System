// src/components/TaskList/CompleteTask.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../ui/Toast'
import { Calendar, CheckCircle, Loader2 } from 'lucide-react'

const CompleteTask = ({ data, employeeId, taskId }) => {
  const { reopenTask } = useContext(AuthContext)
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleReopen = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    reopenTask(employeeId, taskId)
    toast('Task reopened and moved back to active.', 'info')
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4
      flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ borderLeftColor: '#34d399' }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-green-50 text-green-400 tracking-widest uppercase">
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
        <div className="w-full py-2.5 rounded-xl text-sm font-semibold bg-green-50 text-green-500
          flex items-center justify-center gap-2">
          <CheckCircle size={15} /> Completed
        </div>
        <button
          onClick={handleReopen}
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold
            bg-gray-50 text-gray-400 transition-all duration-200
            hover:bg-gray-100 active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Reopening…</> : 'Reopen Task'}
        </button>
      </div>
    </div>
  )
}

export default CompleteTask