import React from 'react'

const CreateTask = () => {
  return (
            <div>
            

            <form className="flex flex-wrap w-full items-start justify-between mt-15">

            {/* Left Side */}
            <div className="w-1/2">

                <div>
                <h3 className="text-sm text-gray-300 mb-0.5">
                    Task Title
                </h3>
                <input
                    type="text"
                    placeholder="Make a UI design"
                    className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-gray-300 mb-0.5">
                    Date
                </h3>
                <input
                    type="date"
                    placeholder='dd-mm-yyyy'
                    className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-gray-300 mb-0.5">
                    Assign to
                </h3>
                <input
                    type="text"
                    placeholder="employee name"
                    className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400 mb-4"
                />
                </div>

                <div>
                <h3 className="text-sm text-gray-300 mb-0.5">
                    Category
                </h3>
                <input
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
                rows="10"
                placeholder="Enter task description..."
                className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border placeholder:text-gray-500 border-gray-400"
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