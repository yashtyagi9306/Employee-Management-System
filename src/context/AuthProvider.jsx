// src/context/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.jsx'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData]       = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('employees')
    if (!stored) {
      setLocalStorage()
    } else {
      const parsed = JSON.parse(stored)
      const isOldFormat = parsed[0]?.tasks[0]?.taskId === undefined
      if (isOldFormat) setLocalStorage()
    }
    const { employees } = getLocalStorage()
    setUserData(employees)

    const storedUser = localStorage.getItem('loggedInUser')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      if (parsed && parsed.id !== undefined) setLoggedInUser(parsed)
    }
  }, [])

  // ─── Auth ─────────────────────────────────────────────────────────────────

  const login = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      const session = { role: 'admin', id: 'admin' }
      setLoggedInUser(session)
      localStorage.setItem('loggedInUser', JSON.stringify(session))
      return true
    }
    const employee = userData.find(e => e.email === email && e.password === password)
    if (employee) {
      const session = { role: 'employee', id: employee.id }
      setLoggedInUser(session)
      localStorage.setItem('loggedInUser', JSON.stringify(session))
      return true
    }
    return false
  }

  const logout = () => {
    setLoggedInUser(null)
    localStorage.removeItem('loggedInUser')
  }

  // ─── Shared helper ────────────────────────────────────────────────────────

  const replaceEmployee = (employees, updatedEmployee) =>
    employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)

  const persist = (newUserData) => {
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  // ─── Employee Task Operations ─────────────────────────────────────────────

  const acceptTask = (employeeId, taskId) => {
    const emp = userData.find(e => e.id === employeeId)
    if (!emp) return
    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: { ...emp.taskNumbers, newTask: emp.taskNumbers.newTask - 1, active: emp.taskNumbers.active + 1 },
      tasks: emp.tasks.map(t => t.taskId === taskId ? { ...t, newTask: false, active: true } : t)
    }))
  }

  const completeTask = (employeeId, taskId) => {
    const emp = userData.find(e => e.id === employeeId)
    if (!emp) return
    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: { ...emp.taskNumbers, active: emp.taskNumbers.active - 1, completed: emp.taskNumbers.completed + 1 },
      tasks: emp.tasks.map(t => t.taskId === taskId ? { ...t, active: false, completed: true } : t)
    }))
  }

  const failTask = (employeeId, taskId) => {
    const emp = userData.find(e => e.id === employeeId)
    if (!emp) return
    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: { ...emp.taskNumbers, active: emp.taskNumbers.active - 1, failed: emp.taskNumbers.failed + 1 },
      tasks: emp.tasks.map(t => t.taskId === taskId ? { ...t, active: false, failed: true } : t)
    }))
  }

  const reopenTask = (employeeId, taskId) => {
    const emp = userData.find(e => e.id === employeeId)
    if (!emp) return
    const task = emp.tasks.find(t => t.taskId === taskId)
    if (!task) return
    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: {
        ...emp.taskNumbers,
        active:    emp.taskNumbers.active + 1,
        completed: task.completed ? emp.taskNumbers.completed - 1 : emp.taskNumbers.completed,
        failed:    task.failed    ? emp.taskNumbers.failed    - 1 : emp.taskNumbers.failed,
      },
      tasks: emp.tasks.map(t => t.taskId === taskId ? { ...t, active: true, completed: false, failed: false } : t)
    }))
  }

  // ─── Admin Operations ─────────────────────────────────────────────────────

  const createTask = ({ taskTitle, taskDescription, taskDate, category, assignToId }) => {
    const emp = userData.find(e => e.id === assignToId)
    if (!emp) return
    const newTask = {
      taskId: Date.now(),
      taskTitle, taskDescription, taskDate, category,
      newTask: true, active: false, completed: false, failed: false,
    }
    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: { ...emp.taskNumbers, newTask: emp.taskNumbers.newTask + 1 },
      tasks: [...emp.tasks, newTask],
    }))
  }

  const editTask = ({ taskId, fromEmployeeId, toEmployeeId, updates }) => {
    const fromEmp = userData.find(e => e.id === fromEmployeeId)
    if (!fromEmp) return
    const task = fromEmp.tasks.find(t => t.taskId === taskId)
    if (!task) return

    const updatedTask = { ...task, ...updates }

    // Same employee — just update the task fields
    if (fromEmployeeId === toEmployeeId) {
      const newData = replaceEmployee(userData, {
        ...fromEmp,
        tasks: fromEmp.tasks.map(t => t.taskId === taskId ? updatedTask : t),
      })
      persist(newData)
      return
    }

    // Different employee — remove from old, add to new, fix both counters
    const toEmp = userData.find(e => e.id === toEmployeeId)
    if (!toEmp) return

    // Decrement the correct counter on the source employee
    const fromNumbers = { ...fromEmp.taskNumbers }
    if (task.newTask)   fromNumbers.newTask--
    else if (task.active)    fromNumbers.active--
    else if (task.completed) fromNumbers.completed--
    else if (task.failed)    fromNumbers.failed--

    const updatedFrom = {
      ...fromEmp,
      taskNumbers: fromNumbers,
      tasks: fromEmp.tasks.filter(t => t.taskId !== taskId),
    }

    // Task moves to new employee as newTask (clean slate)
    const reassignedTask = { ...updatedTask, newTask: true, active: false, completed: false, failed: false }
    const updatedTo = {
      ...toEmp,
      taskNumbers: { ...toEmp.taskNumbers, newTask: toEmp.taskNumbers.newTask + 1 },
      tasks: [...toEmp.tasks, reassignedTask],
    }

    // Replace both employees in one persist call
    const newData = userData.map(emp => {
      if (emp.id === fromEmployeeId) return updatedFrom
      if (emp.id === toEmployeeId)   return updatedTo
      return emp
    })
    persist(newData)
  }

  const deleteTask = (employeeId, taskId) => {
    const emp = userData.find(e => e.id === employeeId)
    if (!emp) return
    const task = emp.tasks.find(t => t.taskId === taskId)
    if (!task) return

    const nums = { ...emp.taskNumbers }
    if (task.newTask)        nums.newTask--
    else if (task.active)    nums.active--
    else if (task.completed) nums.completed--
    else if (task.failed)    nums.failed--

    persist(replaceEmployee(userData, {
      ...emp,
      taskNumbers: nums,
      tasks: emp.tasks.filter(t => t.taskId !== taskId),
    }))
  }

  return (
    <AuthContext.Provider value={{
      userData, loggedInUser,
      login, logout,
      acceptTask, completeTask, failTask, reopenTask,
      createTask, editTask, deleteTask,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider