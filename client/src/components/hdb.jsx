import React from 'react'

const hdb = () => {
  return (
    <div className='container mx-auto'>
      <div className='bg-gradient-to-r from-red-600 to-pink-600 h-[550px] rounded-lg shadow-xl m-4 p-8 relative overflow-hidden'>
        {/* Decorative elements */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2'></div>
        
        {/* Content */}
        <div className='relative z-10 text-white h-full flex flex-col justify-center'>
          <h1 className='text-5xl font-bold mb-4'>Exclusive Hot Deals</h1>
          <p className='text-2xl mb-6'>Save up to 70% off on selected items</p>
          <div className='space-y-4'>
            <div className='bg-white/20 p-4 rounded-lg backdrop-blur-sm max-w-md'>
              <span className='text-xl font-semibold'>Limited Time Offer! 🔥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default hdb
