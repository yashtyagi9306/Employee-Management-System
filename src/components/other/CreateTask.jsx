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

    // assignToId comes from the select — it's a string from the DOM,
    // so we parse it to a number to match employee.id type
    createTask({
      taskTitle,
      taskDescription,
      taskDate,
      category,
      assignToId: Number(assignToId),
    })

    // Reset form
    setTaskTitle('')
    setTaskDescription('')
    setTaskDate('')
    setAssignToId('')
    setCategory('')
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between mt-15"
      >
        {/* Left Side */}
        <div className="w-1/2">

          <div>
            <h3 className="text-sm text-white mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              type="text"
              placeholder="Make a UI design"
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
            />
          </div>

          <div>
            <h3 className="text-sm text-white mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
              type="date"
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
            />
          </div>

          <div>
            <h3 className="text-sm text-grey-300 mb-0.5">Assign To</h3>
            <select
              value={assignToId}
              onChange={(e) => setAssignToId(e.target.value)}
              required
              className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-[#1c1c1c] border border-gray-400 mb-4"
            >
              <option value="" disabled>Select employee</option>
              {userData.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              type="text"
              placeholder="design, dev, etc"
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border text-white placeholder:text-gray-500 border-gray-400"
            />
          </div>

        </div>

        {/* Right Side */}
        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            rows="10"
            placeholder="Enter task description..."
            className="w-full h-44 text-white text-sm py-2 px-4 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400"
          />
          <button
            type="submit"
            className="bg-emerald-500 py-3 px-5 rounded text-sm mt-4 w-full hover:bg-emerald-600"
          >
            Create Task
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreateTask