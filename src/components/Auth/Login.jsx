import React from "react";
import { useState } from "react";

const Login = ({handleLogin}) => {


    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form Submitted.");
        console.log("email is",email);
        console.log("password is",password)
        handleLogin(email,password)
        setEmail("")
        setPassword("")
        // Handle login logic here
    };


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0f0f13]">
      {/* Background Glow */}
      <div className="absolute h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative w-[400px] rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        <h1 className="mb-2 text-center text-4xl font-semibold tracking-tight text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Sign in to continue your journey
        </p>

        <form 
        onSubmit={(e)=>{submitHandler(e)}}
        className="flex flex-col gap-5">
          <input
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
            type="email"
            placeholder="Email Address"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-purple-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(196,181,253,0.25)]"
          />

          <input
            required  
            value = {password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="Password"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-purple-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(196,181,253,0.25)]"
          />

          <button
            className="mt-2 rounded-2xl bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?
          <span className="ml-1 cursor-pointer font-medium text-purple-300 transition hover:text-purple-200">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;