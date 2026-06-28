// src/context/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage.jsx'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState([])
  // loggedInUser is ONLY { role, id } — never the full employee object
  const [loggedInUser, setLoggedInUser] = useState(null)

  // On mount: seed localStorage if empty, then restore session
  useEffect(() => {
    if (!localStorage.getItem('employees')) {
      setLocalStorage()
    }
    const { employees } = getLocalStorage()
    setUserData(employees)

    const stored = localStorage.getItem('loggedInUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      // Guard: only restore if it has the new shape { role, id }
      if (parsed && parsed.id !== undefined) {
        setLoggedInUser(parsed)
      }
    }
  }, [])

  // ─── Auth ────────────────────────────────────────────────────────────────

  const login = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      const sessionData = { role: 'admin', id: 'admin' }
      setLoggedInUser(sessionData)
      localStorage.setItem('loggedInUser', JSON.stringify(sessionData))
      return true
    }

    const employee = userData.find(
      emp => emp.email === email && emp.password === password
    )
    if (employee) {
      const sessionData = { role: 'employee', id: employee.id }
      setLoggedInUser(sessionData)
      localStorage.setItem('loggedInUser', JSON.stringify(sessionData))
      return true
    }

    return false
  }

  const logout = () => {
    setLoggedInUser(null)
    localStorage.removeItem('loggedInUser')
  }

  // ─── Shared helper: update one employee immutably ─────────────────────────
  // Takes the current userData array and a new employee object.
  // Returns a new array with that employee replaced.
  const replaceEmployee = (employees, updatedEmployee) => {
    return employees.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    )
  }

  // ─── Task Operations ──────────────────────────────────────────────────────

  const acceptTask = (employeeId, taskId) => {
    const employee = userData.find(emp => emp.id === employeeId)
    if (!employee) return

    const updatedEmployee = {
      ...employee,
      taskNumbers: {
        ...employee.taskNumbers,
        newTask: employee.taskNumbers.newTask - 1,
        active: employee.taskNumbers.active + 1,
      },
      tasks: employee.tasks.map(task =>
        task.taskId === taskId
          ? { ...task, newTask: false, active: true }
          : task
      )
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  const completeTask = (employeeId, taskId) => {
    const employee = userData.find(emp => emp.id === employeeId)
    if (!employee) return

    const updatedEmployee = {
      ...employee,
      taskNumbers: {
        ...employee.taskNumbers,
        active: employee.taskNumbers.active - 1,
        completed: employee.taskNumbers.completed + 1,
      },
      tasks: employee.tasks.map(task =>
        task.taskId === taskId
          ? { ...task, active: false, completed: true }
          : task
      )
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  const failTask = (employeeId, taskId) => {
    const employee = userData.find(emp => emp.id === employeeId)
    if (!employee) return

    const updatedEmployee = {
      ...employee,
      taskNumbers: {
        ...employee.taskNumbers,
        active: employee.taskNumbers.active - 1,
        failed: employee.taskNumbers.failed + 1,
      },
      tasks: employee.tasks.map(task =>
        task.taskId === taskId
          ? { ...task, active: false, failed: true }
          : task
      )
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  // Reopen moves a completed or failed task back to active
  const reopenTask = (employeeId, taskId) => {
    const employee = userData.find(emp => emp.id === employeeId)
    if (!employee) return

    const task = employee.tasks.find(t => t.taskId === taskId)
    if (!task) return

    // Figure out which counter to decrement based on current task state
    const wasCompleted = task.completed
    const wasFailed = task.failed

    const updatedEmployee = {
      ...employee,
      taskNumbers: {
        ...employee.taskNumbers,
        active: employee.taskNumbers.active + 1,
        completed: wasCompleted
          ? employee.taskNumbers.completed - 1
          : employee.taskNumbers.completed,
        failed: wasFailed
          ? employee.taskNumbers.failed - 1
          : employee.taskNumbers.failed,
      },
      tasks: employee.tasks.map(t =>
        t.taskId === taskId
          ? { ...t, active: true, completed: false, failed: false }
          : t
      )
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  // ─── Admin Operations ─────────────────────────────────────────────────────

  const createTask = ({ taskTitle, taskDescription, taskDate, category, assignToId }) => {
    const employee = userData.find(emp => emp.id === assignToId)
    if (!employee) return

    const newTask = {
      taskId: Date.now(),   // stable unique id
      taskTitle,
      taskDescription,
      taskDate,
      category,
      newTask: true,
      active: false,
      completed: false,
      failed: false,
    }

    const updatedEmployee = {
      ...employee,
      taskNumbers: {
        ...employee.taskNumbers,
        newTask: employee.taskNumbers.newTask + 1,
      },
      tasks: [...employee.tasks, newTask]
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  const deleteTask = (employeeId, taskId) => {
    const employee = userData.find(emp => emp.id === employeeId)
    if (!employee) return

    const task = employee.tasks.find(t => t.taskId === taskId)
    if (!task) return

    // Decrement whichever counter this task currently belongs to
    const updatedTaskNumbers = { ...employee.taskNumbers }
    if (task.newTask) updatedTaskNumbers.newTask--
    else if (task.active) updatedTaskNumbers.active--
    else if (task.completed) updatedTaskNumbers.completed--
    else if (task.failed) updatedTaskNumbers.failed--

    const updatedEmployee = {
      ...employee,
      taskNumbers: updatedTaskNumbers,
      tasks: employee.tasks.filter(t => t.taskId !== taskId)
    }

    const newUserData = replaceEmployee(userData, updatedEmployee)
    setUserData(newUserData)
    localStorage.setItem('employees', JSON.stringify(newUserData))
  }

  return (
    <AuthContext.Provider value={{
      userData,
      loggedInUser,
      login,
      logout,
      acceptTask,
      completeTask,
      failTask,
      reopenTask,
      createTask,
      deleteTask,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider