import React from "react";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAdminAuth from "../store/useAdminAuth";
function AdminLogin() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const navigate=useNavigate();

  // const Cemail="neuralnexus@gmail.com";
  // const Cpassword="neuralnexus";
  // // handle submit
  // const handlesubmit=(e)=>{
  //    e.preventDefault();
  //    if(email===Cemail && password===Cpassword){
  //      navigate('/admindashboard');
  //    }else{
  //      alert("Please Check The Credentials");
  //    }
  // }

  const {checkAuth,isAuth}=useAdminAuth()

  const handlesubmit=async(e)=>{

     e.preventDefault();
    const result=await checkAuth({email:email,password:password})
    console.log(result);
    
    if(result){
    navigate('/admindashboard');
    }

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 max-w-md w-full">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>
          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e)=>{setemail(e.target.value)}}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e)=>{setpassword(e.target.value)}}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              onClick={handlesubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
