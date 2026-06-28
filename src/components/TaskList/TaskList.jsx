// src/components/TaskList/TaskList.jsx

import React from 'react'
import ActiveTask from './ActiveTask'
import NewTask from './NewTask'
import FailedTask from './FailedTask'
import CompleteTask from './CompleteTask'

const TaskList = ({ employee }) => {
  return (
    <div
      id="tasklist"
      className="flex overflow-x-auto items-center justify-start gap-10 h-[55%] w-full py-0 mt-10"
    >
      {employee.tasks.map((task) => {
        if (task.newTask) {
          return (
            <NewTask
              key={task.taskId}
              data={task}
              employeeId={employee.id}
              taskId={task.taskId}
            />
          )
        }
        if (task.active) {
          return (
            <ActiveTask
              key={task.taskId}
              data={task}
              employeeId={employee.id}
              taskId={task.taskId}
            />
          )
        }
        if (task.completed) {
          return (
            <CompleteTask
              key={task.taskId}
              data={task}
              employeeId={employee.id}
              taskId={task.taskId}
            />
          )
        }
        if (task.failed) {
          return (
            <FailedTask
              key={task.taskId}
              data={task}
              employeeId={employee.id}
              taskId={task.taskId}
            />
          )
        }
        return null
      })}
    </div>
  )
}

export default TaskList