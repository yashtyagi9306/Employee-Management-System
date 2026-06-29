// src/components/TaskList/NewTask.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../ui/Toast'
import { Calendar, Loader2 } from 'lucide-react'

const NewTask = ({ data, employeeId, taskId }) => {
  const { acceptTask } = useContext(AuthContext)
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    acceptTask(employeeId, taskId)
    toast('Task accepted and moved to active.', 'success')
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4
      flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ borderLeftColor: '#a78bfa' }}>
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
        onClick={handleAccept}
        disabled={loading}
        className="mt-auto w-full py-2.5 rounded-xl text-white text-sm font-semibold
          transition-all duration-200 hover:opacity-90 hover:shadow-md
          active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)' }}
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> Accepting…</> : 'Accept Task'}
      </button>
    </div>
  )
}

export default NewTask