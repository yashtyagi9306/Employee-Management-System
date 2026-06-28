// src/components/TaskList/ActiveTask.jsx

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const ActiveTask = ({ data, employeeId, taskId }) => {
  const { completeTask, failTask } = useContext(AuthContext)

  return (
    <div className="shrink-0 h-full w-[300px] bg-yellow-400 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h2 className="bg-red-500 text-base text-white rounded px-3 py-1">{data.category}</h2>
        <h3 className="text-white text-base">{data.taskDate}</h3>
      </div>
      <h2 className="text-2xl mt-10 text-white font-semibold">{data.taskTitle}</h2>
      <p className="mt-4 text-base text-white">{data.taskDescription}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => completeTask(employeeId, taskId)}
          className="bg-green-500 py-3 px-6 text-sm border-r-4 border-b-4 border-2 rounded-xl m-1"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => failTask(employeeId, taskId)}
          className="bg-red-500 py-3 px-6 text-sm border-r-4 border-b-4 border-2 rounded-xl m-1"
        >
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default ActiveTask