import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login.jsx";
import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard.jsx";
import { setLocalStorage } from "./utils/localStorage.jsx";
import { AuthContext } from "./context/AuthProvider.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext);
  console.log(userData);
  

  // Initialize localStorage data
  useEffect(() => {
    if (!localStorage.getItem("employees")) {
      setLocalStorage();
    }
  }, []);

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
      
    }
  }, [])

  

  const handleLogin = (email, password) => {
    const employee = userData?.find(
      (e) => e.email === email && e.password === password
    );

    if (email === "admin@example.com" && password === "123") {
      setUser("admin");

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "admin",
          data: userData.admin
        })
      );

      console.log("Admin Login");
    } else if (employee) {
      if(employee){
        setUser("employee");
        setLoggedInUserData(employee)

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "employee",
          data: employee
        })
      );

      console.log("Employee Login");
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="App">
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && <AdminDashboard changeUser={setUser}/>}

      {user === "employee" && <EmployeeDashboard changeUser={setUser} data={loggedInUserData}/>}
    </div>
  );
}

export default App;