import React from 'react'

const TaskListNumbers = () => {
  return (
    <div className="flex mt-10 justify-between gap-5 screen">
        <div className=" text-white rounded-xl px-9 py-6 w-[45%] bg-red-400">
            <h2 className="text-white text-xl font-bold">0</h2>
            <h3 className="text-xl font-medium">New Task</h3>
        </div>

        <div className=" text-white rounded-xl px-9 py-6 w-[45%] bg-blue-400">
            <h2 className="text-white text-xl font-bold">0</h2>
            <h3 className="text-xl font-medium">New Task</h3>
        </div>

        <div className=" text-white rounded-xl px-9 py-6 w-[45%] bg-green-400">
            <h2 className="text-white text-xl font-bold">0</h2>
            <h3 className="text-xl font-medium">New Task</h3>
        </div>

        <div className=" text-white rounded-xl px-9 py-6 w-[45%] bg-yellow-400">
            <h2 className="text-white text-xl font-bold">0</h2>
            <h3 className="text-xl font-medium">New Task</h3>
        </div >
        
    </div>
  )
}

export default TaskListNumbers