import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     setTaskDate('')
    //     setAssignTo('')
    //     setCategory('')
        
    //     setTaskTitle('')
    //     setTaskDescription('')
    // }

    const  [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskDate, setTaskDate] = useState("")
    const [assignTo, setAssignTo] = useState("")
    const [category, setCategory] = useState("")
    
    const [task, setTask] = useState({})
    const submitHandler = (e) => {
        e.preventDefault()
        const newTask = {taskTitle, taskDescription, taskDate, category, assignTo, active:false, newTask:true, failed:false, completed:false}

        setTask(newTask)
      
        
        const data = userData
        console.log(data);
        userData.forEach(function(elem){
            if(assignTo == elem.firstName){
                elem.tasks.push(newTask)
                elem.taskNumbers.newTask = elem.taskNumbers.newTask + 1
                
            }
        }) 
        // localStorage.setItem('employees',JSON.stringify(data))
        setUserData(data)
        console.log(data)

        setTaskDate('')
        setAssignTo('')
        setCategory('')
        
        setTaskTitle('')
        setTaskDescription('')
    
    
    }

    
        
    
    
    
    return (
            <div>
            <form onSubmit = {(e)=>{
                submitHandler(e)
            }}className="flex flex-wrap w-full items-start justify-between mt-15">

            {/* Left Side */}
            <div className="w-1/2">

                <div>
                <h3 className="text-sm text-white mb-0.5">
                    Task Title
                </h3>
                <input
                    value = {taskTitle}
                    onChange={(e)=>{
                        setTaskTitle(e.target.value)
                    }}
                    type="text"
                    placeholder="Make a UI design"
                    className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-white mb-0.5">
                    Date
                </h3>
                <input
                    value = {taskDate}
                    onChange={(e)=>{
                        setTaskDate(e.target.value)
                    }}
                    type="date"
                    placeholder='dd-mm-yyyy'
                    className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-white mb-0.5">
                    Assign to
                </h3>
                <input
                    value = {assignTo}
                    onChange={(e)=>{
                        setAssignTo(e.target.value)
                    }}
                    
                    type="text"
                    placeholder="employee name"
                    className="text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border text-white placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-gray-300 mb-0.5">
                    Category
                </h3>
                <input
                    value = {category}
                    onChange={(e)=>{
                        setCategory(e.target.value)
                    }}
                    type="text"
                    placeholder="design, dev, etc"
                    className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400"
                />
                </div>

            </div>

            {/* Right Side */}
            <div className="w-2/5 flex flex-col items-start">
                <h3 className="text-sm text-gray-300 mb-0.5">
                Description
                </h3>

                <textarea
                value = {taskDescription}
                    onChange={(e)=>{
                        setTaskDescription(e.target.value)
                    }}
                rows="10"
                placeholder="Enter task description..."
                className="w-full h-44 text-white text-sm py-2 px-4 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400"
                />

                <button
                type="submit"
                className="bg-emerald-500 py-3 px-5 rounded text-sm mt-4 w-full hover:bg-emerald-600"
                >
                Create Task
                </button>
            </div>

            </form>
        </div>
  )
}

export default CreateTask