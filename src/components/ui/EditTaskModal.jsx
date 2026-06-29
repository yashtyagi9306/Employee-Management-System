// src/components/ui/EditTaskModal.jsx

import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from './Toast'
import Modal from './Modal'
import { Loader2 } from 'lucide-react'

const EditTaskModal = ({ task, employeeId, onClose }) => {
  const { userData, editTask } = useContext(AuthContext)
  const toast = useToast()

  const [taskTitle,       setTaskTitle]       = useState(task.taskTitle)
  const [taskDescription, setTaskDescription] = useState(task.taskDescription)
  const [category,        setCategory]        = useState(task.category)
  const [taskDate,        setTaskDate]        = useState(task.taskDate)
  const [assignToId,      setAssignToId]      = useState(String(employeeId))
  const [loading,         setLoading]         = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 350))

    editTask({
      taskId:         task.taskId,
      fromEmployeeId: employeeId,
      toEmployeeId:   Number(assignToId),
      updates: { taskTitle, taskDescription, category, taskDate },
    })

    toast('Task updated successfully.', 'success')
    setLoading(false)
    onClose()
  }

  const inputClass = `w-full text-sm text-gray-700 placeholder:text-gray-300 py-3 px-4
    rounded-2xl border border-gray-200 outline-none bg-white transition-all duration-200
    focus:border-purple-400 focus:shadow-[0_0_0_3px_rgba(167,139,250,0.15)]`

  const labelClass = "text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5 block"

  return (
    <Modal title="Edit Task" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className={labelClass}>Task Title</label>
          <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
            required type="text" className={inputClass} />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className={labelClass}>Due Date</label>
            <input value={taskDate} onChange={e => setTaskDate(e.target.value)}
              required type="date" className={inputClass} />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Assign To</label>
            <select value={assignToId} onChange={e => setAssignToId(e.target.value)}
              required className={inputClass}>
              {userData.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.firstName}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <input value={category} onChange={e => setCategory(e.target.value)}
            required type="text" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)}
            required rows="4" className={inputClass} style={{ resize: 'vertical' }} />
        </div>

        <div className="flex gap-3 mt-2">
          <button type="button" onClick={onClose}
            className="flex-1 py-3 rounded-full text-sm font-semibold text-gray-500
              border border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 py-3 rounded-full text-sm font-semibold text-white
              transition-all duration-200 hover:opacity-90 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}>
            {loading
              ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
              : 'Save changes'}
          </button>
        </div>

      </form>
    </Modal>
  )
}

export default EditTaskModal