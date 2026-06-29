// src/components/TaskList/ActiveTask.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../ui/Toast'
import { Calendar, Loader2 } from 'lucide-react'

const ActiveTask = ({ data, employeeId, taskId }) => {
  const { completeTask, failTask } = useContext(AuthContext)
  const toast = useToast()
  const [loading, setLoading] = useState(null) // 'complete' | 'fail' | null

  const handleComplete = async () => {
    setLoading('complete')
    await new Promise(r => setTimeout(r, 300))
    completeTask(employeeId, taskId)
    toast('Task marked as completed. Great work!', 'success')
    setLoading(null)
  }

  const handleFail = async () => {
    setLoading('fail')
    await new Promise(r => setTimeout(r, 300))
    failTask(employeeId, taskId)
    toast('Task marked as failed.', 'error')
    setLoading(null)
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm border-l-4
      flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
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
          onClick={handleComplete}
          disabled={loading !== null}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold
            transition-all duration-200 hover:opacity-90 hover:shadow-md
            active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}
        >
          {loading === 'complete'
            ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
            : 'Mark complete'}
        </button>
        <button
          onClick={handleFail}
          disabled={loading !== null}
          className="w-full py-2.5 rounded-xl text-sm font-semibold
            bg-red-50 text-red-400 transition-all duration-200
            hover:bg-red-100 active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {loading === 'fail'
            ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
            : 'Mark failed'}
        </button>
      </div>
    </div>
  )
}

export default ActiveTask