// src/components/Auth/Login.jsx

import React, { useState } from 'react'
import { Mail, Lock, Sparkles } from 'lucide-react'

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    handleLogin(email, password)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #e8e4f8 0%, #f0f7ee 50%, #fde8e8 100%)'
      }}
    >
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #d4c8f5 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #fbc8d4 0%, transparent 70%)' }}
      />
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #c8f5d4 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl px-10 py-10 w-[440px]">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #ec4899)' }}
          >
            <Sparkles size={18} color="white" />
          </div>
          <span className="text-lg font-semibold text-gray-800">Bloom EMS</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-400 text-sm mb-8">
          Sign in to pick up where your team left off.
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2 block">
              Email
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-purple-300 focus-within:shadow-sm transition-all">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="you@company.com"
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-300 bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2 block">
              Password
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 focus-within:border-purple-300 focus-within:shadow-sm transition-all">
              <Lock size={16} className="text-gray-400 shrink-0" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="••••••••"
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-300 bg-transparent"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full text-white font-semibold text-sm mt-2 transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(to right, #a78bfa, #ec4899)' }}
          >
            Sign in
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <span className="text-purple-500 font-medium cursor-pointer hover:text-purple-400">
            Sign up
          </span>
        </p>
        <p className="text-center text-xs text-gray-300 mt-2">
          Tip: emails starting with <code className="font-mono">admin</code> open the admin view.
        </p>

      </div>
    </div>
  )
}

export default Login