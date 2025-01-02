import React from 'react'

const footerpayment = () => {
  return (
    <div className='bg-slate-50'>
      <div className='container mx-auto px-4 py-6 border-t border-slate-200'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>
          <div>
            <a href="www.betarbazar.com" className='text-md font-normal hover:text-blue-500'>betarbazar.com</a>
          </div>
          <div className='flex flex-wrap gap-2 items-center justify-center'>
            <p className='text-sm font-normal px-6'>We're using safe payment for</p>
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/bkash.png" alt="Bkash" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/visa.png" alt="VISA" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/mastercard.png" alt="Mastercard" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/ae.png" alt="American Express" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/nogod.png" alt="Nogod" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src="/src/assets/pglogos/upay.png" alt="UPAY" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default footerpayment
