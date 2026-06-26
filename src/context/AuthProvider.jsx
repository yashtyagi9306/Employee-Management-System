
import React, { createContext, useState, useEffect } from 'react'
import { getLocalStorage } from '../utils/localStorage.jsx'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const { employees } = getLocalStorage()
    setUserData(employees )
  }, [])

  return (
    <AuthContext.Provider value={[userData,setUserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider