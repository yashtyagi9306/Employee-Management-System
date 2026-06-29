// src/components/TaskList/TaskList.jsx

import React from 'react'
import ActiveTask   from './ActiveTask'
import NewTask      from './NewTask'
import FailedTask   from './FailedTask'
import CompleteTask from './CompleteTask'
import { CheckCircle, Filter } from 'lucide-react'

const matchesFilter = (task, filter) => {
  if (filter === 'All')       return true
  if (filter === 'New')       return task.newTask
  if (filter === 'Active')    return task.active
  if (filter === 'Completed') return task.completed
  if (filter === 'Failed')    return task.failed
  return true
}

const TaskList = ({ employee, activeFilter = 'All' }) => {
  const filtered = employee.tasks.filter(t => matchesFilter(t, activeFilter))

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your tasks</h2>
          <p className="text-sm text-gray-400">A gentle nudge of what's on your plate.</p>
        </div>
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          {filtered.length} {activeFilter === 'All' ? 'Total' : `${activeFilter}`}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4">
            {activeFilter === 'All'
              ? <CheckCircle size={26} className="text-green-400" />
              : <Filter size={26} className="text-purple-300" />
            }
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            {activeFilter === 'All' ? 'All clear!' : `No ${activeFilter.toLowerCase()} tasks`}
          </h3>
          <p className="text-sm text-gray-400">
            {activeFilter === 'All'
              ? 'No tasks assigned yet. Enjoy the quiet.'
              : `You have no tasks with status "${activeFilter}" right now.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((task) => {
            const props = { data: task, employeeId: employee.id, taskId: task.taskId }
            if (task.newTask)   return <NewTask      key={task.taskId} {...props} />
            if (task.active)    return <ActiveTask    key={task.taskId} {...props} />
            if (task.completed) return <CompleteTask  key={task.taskId} {...props} />
            if (task.failed)    return <FailedTask    key={task.taskId} {...props} />
            return null
          })}
        </div>
      )}
    </div>
  )
}

export default TaskList