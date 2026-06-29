// src/components/ui/DeleteConfirmModal.jsx

import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from './Toast'
import Modal from './Modal'
import { Trash2, Loader2 } from 'lucide-react'

const DeleteConfirmModal = ({ task, employeeId, onClose }) => {
  const { deleteTask } = useContext(AuthContext)
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 350))
    deleteTask(employeeId, task.taskId)
    toast(`"${task.taskTitle}" was deleted.`, 'error')
    setLoading(false)
    onClose()
  }

  return (
    <Modal title="Delete Task" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Trash2 size={24} className="text-red-400" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-800 mb-1">
            Delete "{task.taskTitle}"?
          </p>
          <p className="text-sm text-gray-400">
            This action cannot be undone. The task and its counters will be permanently removed.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onClose}
          className="flex-1 py-3 rounded-full text-sm font-semibold text-gray-500
            border border-gray-200 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]">
          Cancel
        </button>
        <button onClick={handleDelete} disabled={loading}
          className="flex-1 py-3 rounded-full text-sm font-semibold text-white
            bg-red-400 hover:bg-red-500 transition-all duration-200
            active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2">
          {loading
            ? <><Loader2 size={14} className="animate-spin" /> Deleting…</>
            : 'Yes, delete'}
        </button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal