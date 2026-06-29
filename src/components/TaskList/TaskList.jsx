// src/components/TaskList/TaskList.jsx

import React from 'react'
import ActiveTask from './ActiveTask'
import NewTask from './NewTask'
import FailedTask from './FailedTask'
import CompleteTask from './CompleteTask'

const TaskList = ({ employee }) => {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your tasks</h2>
          <p className="text-sm text-gray-400">A gentle nudge of what's on your plate.</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          {employee.tasks.length} Total
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {employee.tasks.map((task) => {
          if (task.newTask)   return <NewTask      key={task.taskId} data={task} employeeId={employee.id} taskId={task.taskId} />
          if (task.active)    return <ActiveTask    key={task.taskId} data={task} employeeId={employee.id} taskId={task.taskId} />
          if (task.completed) return <CompleteTask  key={task.taskId} data={task} employeeId={employee.id} taskId={task.taskId} />
          if (task.failed)    return <FailedTask    key={task.taskId} data={task} employeeId={employee.id} taskId={task.taskId} />
          return null
        })}
      </div>
    </div>
  )
}

export default TaskList