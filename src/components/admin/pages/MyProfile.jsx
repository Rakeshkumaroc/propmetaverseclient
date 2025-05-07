import React from 'react'
import ProfileFrom from '../profile/ProfileFrom'

const MyProfile = () => {
  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:px-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
    <div className="flex items-center flex-wrap gap-4   justify-between">
      <div className="space-y-1">
        <p className="text-[30px] font-semibold leading-[45px]">My Profile</p>
        <p className="text-sm leading-[25.9px]">
        We are glad to see you again!
        </p>
      </div>
       
    </div>
    <ProfileFrom />
  </div>
  )
}

export default MyProfile