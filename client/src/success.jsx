import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl text-red-500 font-bold mb-4">Assalamu alaykum! You have successfully logged in</h1>
        <button 
          onClick={() => navigate("/")} 
          className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Success
