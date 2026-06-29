// src/components/other/AllTask.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Search, Users, Pencil, Trash2 } from 'lucide-react'
import EditTaskModal from '../ui/EditTaskModal'
import DeleteConfirmModal from '../ui/DeleteConfirmModal'

const badge = (value, color) => {
  if (value === 0) return <span className="text-sm text-gray-300 font-medium">0</span>
  const styles = {
    purple: 'bg-purple-100 text-purple-500',
    blue:   'bg-blue-100 text-blue-500',
    green:  'bg-green-100 text-green-500',
    red:    'bg-red-100 text-red-500',
  }
  return (
    <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold ${styles[color]}`}>
      {value}
    </span>
  )
}

const AllTask = () => {
  const { userData } = useContext(AuthContext)

  const [search,      setSearch]      = useState('')
  const [editTarget,  setEditTarget]  = useState(null) // { task, employeeId }
  const [deleteTarget, setDeleteTarget] = useState(null) // { task, employeeId }

  // Case-insensitive real-time search
  const filtered = userData.filter(emp =>
    emp.firstName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Team performance</h2>
      <p className="text-sm text-gray-400 mb-5">Workload distribution at a glance.</p>

      {/* Search */}
      <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2.5 mb-5
        focus-within:border-purple-400 focus-within:shadow-[0_0_0_3px_rgba(167,139,250,0.15)]
        transition-all duration-200">
        <Search size={15} className="text-gray-300 shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search employees…"
          className="flex-1 text-sm text-gray-700 placeholder:text-gray-300 outline-none bg-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-3">
            <Users size={22} className="text-purple-300" />
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            {search ? `No employee matches "${search}"` : 'No employees yet'}
          </h3>
          <p className="text-xs text-gray-400">
            {search ? 'Try a different name.' : 'Employees will appear here once added.'}
          </p>
        </div>
      ) : (
        // Expandable rows: employee summary + their tasks inline
        <div className="flex flex-col gap-3">
          {filtered.map(emp => (
            <EmployeeRow
              key={emp.id}
              emp={emp}
              onEdit={(task) => setEditTarget({ task, employeeId: emp.id })}
              onDelete={(task) => setDeleteTarget({ task, employeeId: emp.id })}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {editTarget && (
        <EditTaskModal
          task={editTarget.task}
          employeeId={editTarget.employeeId}
          onClose={() => setEditTarget(null)}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          task={deleteTarget.task}
          employeeId={deleteTarget.employeeId}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

// ── Employee row: summary + expandable task list ──────────────────────────────
const EmployeeRow = ({ emp, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">

      {/* Summary row — click to expand */}
      <button
        onClick={() => setExpanded(p => !p)}
        className="w-full flex items-center gap-4 px-5 py-3.5
          hover:bg-gray-50/60 transition-colors duration-150 text-left"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)' }}>
          {emp.firstName[0]}
        </div>
        <span className="text-sm font-semibold text-gray-700 w-32 shrink-0">{emp.firstName}</span>
        <div className="flex items-center gap-4 ml-auto">
          {badge(emp.taskNumbers.newTask,   'purple')}
          {badge(emp.taskNumbers.active,    'blue')}
          {badge(emp.taskNumbers.completed, 'green')}
          {badge(emp.taskNumbers.failed,    'red')}
          <span className="text-gray-300 text-xs ml-2">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded task list */}
      {expanded && (
        <div className="border-t border-gray-100">
          {emp.tasks.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No tasks assigned.</p>
          ) : (
            emp.tasks.map(task => (
              <div key={task.taskId}
                className="flex items-center gap-4 px-5 py-3 border-b border-gray-50
                  last:border-0 hover:bg-gray-50/40 transition-colors duration-150">

                {/* Status dot */}
                <span className="w-2 h-2 rounded-full shrink-0" style={{
                  background: task.newTask   ? '#a78bfa'
                            : task.active    ? '#60a5fa'
                            : task.completed ? '#34d399'
                            : '#f87171'
                }} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{task.taskTitle}</p>
                  <p className="text-xs text-gray-400">{task.category} · {task.taskDate}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onEdit(task)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center
                      text-gray-400 hover:bg-purple-50 hover:text-purple-500
                      transition-all duration-150"
                    title="Edit task"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(task)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center
                      text-gray-400 hover:bg-red-50 hover:text-red-400
                      transition-all duration-150"
                    title="Delete task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default AllTask