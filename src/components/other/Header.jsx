// src/components/other/Header.jsx

import React from 'react'

const Header = ({ userName, onLogout }) => {
  return (
    <div className="flex space-between bg-violet-500 hover:bg-violet-600 transition-all duration-300 text-white px-6 py-3 rounded-full">
      <h1 className="text-2xl font-medium">
        Hello <br />
        <span className="text-4xl font-bold">
{userName} ✨
</span>
      </h1>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Log out
      </button>
    </div>
  )
}

export default Header