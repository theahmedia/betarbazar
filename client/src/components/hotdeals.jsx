import React from 'react'
import { FaStar, FaArrowRight } from 'react-icons/fa'

const HotDeals = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Hot Deals</h1>
      
      <div className='grid md:grid-cols-2 gap-6'>
        {/* Product 1 */}
        <div className='border rounded-lg p-4 shadow-md'>
          <img 
            src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format"
            alt="Mustard Oil" 
            className='w-full h-48 object-cover rounded-md'
          />
          <h2 className='text-xl font-semibold mt-2'>Mustard Oil</h2>
          <div className='flex gap-1 text-yellow-400 my-2'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className='text-xl font-bold mb-2'>৳ ২৫০</p>
          <div className='flex gap-2'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add to Cart</button>
            <button className='bg-green-500 text-white px-4 py-2 rounded'>Order Now</button>
          </div>
        </div>

        {/* Product 2 */}
        <div className='border rounded-lg p-4 shadow-md'>
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format"
            alt="Flour" 
            className='w-full h-48 object-cover rounded-md'
          />
          <h2 className='text-xl font-semibold mt-2'>Flour</h2>
          <div className='flex gap-1 text-yellow-400 my-2'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className='text-xl font-bold mb-2'>৳ ৮৫</p>
          <div className='flex gap-2'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add to Cart</button>
            <button className='bg-green-500 text-white px-4 py-2 rounded'>Order Now</button>
          </div>
        </div>

        {/* Product 3 */}
        <div className='border rounded-lg p-4 shadow-md'>
          <img 
            src="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format"
            alt="Mutton" 
            className='w-full h-48 object-cover rounded-md'
          />
          <h2 className='text-xl font-semibold mt-2'>Mutton</h2>
          <div className='flex gap-1 text-yellow-400 my-2'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className='text-xl font-bold mb-2'>৳ ৮৫০</p>
          <div className='flex gap-2'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add to Cart</button>
            <button className='bg-green-500 text-white px-4 py-2 rounded'>Order Now</button>
          </div>
        </div>

        {/* Product 4 */}
        <div className='border rounded-lg p-4 shadow-md'>
          <img 
            src="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format"
            alt="Egg" 
            className='w-full h-48 object-cover rounded-md'
          />
          <h2 className='text-xl font-semibold mt-2'>Egg</h2>
          <div className='flex gap-1 text-yellow-400 my-2'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          <p className='text-xl font-bold mb-2'>৳ ১২০</p>
          <div className='flex gap-2'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Add to Cart</button>
            <button className='bg-green-500 text-white px-4 py-2 rounded'>Order Now</button>
          </div>
        </div>
      </div>

      {/* View More Button */}
      <div className='text-center mt-8'>
        <button className='flex items-center gap-2 mx-auto bg-gray-800 text-white px-6 py-2 rounded'>
          View More <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default HotDeals
