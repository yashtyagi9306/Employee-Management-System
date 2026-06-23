import React from 'react'

const Header = () => {
  return (
    <div className = "flex items-end justify-between text-white">
        <h1 className='text-2xl font-medium'>
            Hello <br /> <span className="text-3xl font-semibold"> Yash! </span>
        </h1>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Log out
        </button>
    </div>
  )
}

export default Header