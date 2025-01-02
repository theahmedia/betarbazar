import React from 'react'
import { FaTruck, FaShieldAlt, FaCreditCard, FaHeadset } from 'react-icons/fa'
import { SiCodefresh } from "react-icons/si";


const PolicyInfo = () => {
  return (
    <div className='container mx-auto px-4 py-8 border-b'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-32'>
        {/* Policy Item 1 */}
        <div className='flex items-center gap-4'>
          <div className='text-gray-600 text-3xl'>
            <FaTruck />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800'>Free Home Delivery</h3>
            <p className='text-sm text-gray-600'>Get your products at your doorstep</p>
          </div>
        </div>

        {/* Policy Item 2 */}
        <div className='flex items-center gap-4'>
          <div className='text-gray-600 text-3xl'>
          <SiCodefresh />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800'>Fresh Products</h3>
            <p className='text-sm text-gray-600'>Organic fresh food facilities</p>
          </div>
        </div>

        {/* Policy Item 3 */}
        <div className='flex items-center gap-4'>
          <div className='text-gray-600 text-3xl'>
            <FaCreditCard />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800'>Save Money</h3>
            <p className='text-sm text-gray-600'>Exclusive sale on selected items*</p>
          </div>
        </div>

        {/* Policy Item 4 */}
        <div className='flex items-center gap-4'>
          <div className='text-gray-600 text-3xl'>
            <FaHeadset />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800'>Customer Support</h3>
            <p onClick={() => window.location.href = 'tel:+8801758111870'} className="cursor-pointer text-md font-normal hover:text-blue-600">01758 111 870</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyInfo