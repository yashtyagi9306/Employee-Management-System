// src/components/other/CreateTask.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
  const { userData, createTask } = useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignToId, setAssignToId] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    createTask({
      taskTitle,
      taskDescription,
      taskDate,
      category,
      assignToId: Number(assignToId),
    })
    setTaskTitle('')
    setTaskDescription('')
    setTaskDate('')
    setAssignToId('')
    setCategory('')
  }

  const inputClass = "w-full text-sm text-gray-700 placeholder:text-gray-300 py-3 px-4 rounded-2xl border border-gray-200 outline-none focus:border-purple-300 focus:shadow-sm transition-all bg-white"
  const labelClass = "text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5 block"

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-5">

      <div>
        <label className={labelClass}>Task Title</label>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          type="text"
          placeholder="Make a UI design"
          className={inputClass}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClass}>Date</label>
          <input
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
            type="date"
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Assign To</label>
          <select
            value={assignToId}
            onChange={(e) => setAssignToId(e.target.value)}
            required
            className={inputClass}
          >
            <option value="" disabled>Select employee</option>
            {userData.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.firstName}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          type="text"
          placeholder="design, dev, docs..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
          rows="5"
          placeholder="What does done look like?"
          className={inputClass}
          style={{ resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}
      >
        Create task
      </button>

    </form>
  )
}

export default CreateTask