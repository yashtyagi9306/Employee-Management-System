import { useContext, useEffect } from "react"
import Login from "./components/Auth/Login.jsx"
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx"
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard.jsx"
import { getLocalStorage, setLocalStorage } from "./utils/localStorage.jsx"
import React, { useState } from 'react'
import { AuthContext } from "./context/AuthProvider.jsx"

function App() {

  useEffect(() => {
    setLocalStorage();
    // getLocalStorage();
    
  },[])

  const [user, setUser] = useState(null)
  
  const authData = useContext(AuthContext)
  // console.log("authData:", authData)


  useEffect(()=>{
    if(authData){
      const loggedInUser = localStorage.getItem("loggedInUser")
      if (loggedInUser){
        setUser(loggedInUser.role)
      }
    }
  }, [authData])

  
 


const handleLogin = (email, password) => {

  console.log("AuthData:", authData)

  const employee = authData?.employees?.find(
    (e) => e.email === email && e.password === password
  )

  console.log("Employee:", employee)

  if (email === "admin@example.com" && password === "123") {

    console.log("Admin Login")
    setUser("admin")

  } else if (employee) {

    console.log("Employee Login")
    setUser("employee")

  } else {

    console.log("Invalid Login")
    alert("Invalid Credentials")

  }
}
  

  
  return (
  <div className="App">
      
      {!user? <Login handleLogin = {handleLogin}/> : " "}
      {user === "admin" && <AdminDashboard />}
      {user === "employee" && <EmployeeDashboard />}
      
      {/* <EmployeeDashboard />
      <AdminDashboard /> */}
  </div>
  
  )

}

export default App
