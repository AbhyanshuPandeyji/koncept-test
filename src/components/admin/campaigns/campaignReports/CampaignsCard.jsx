import React, { useEffect } from 'react'
import { FaCalendarCheck } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";

// for data show
import { FcSms } from "react-icons/fc";
import { IoLogoWhatsapp } from "react-icons/io";

const CampaignsCard = ({ value, handleSelectedCard , isActive  }) => {

  // useEffect(()=>{
  //   handleSelectedCard();
  // },[data])

  return (
    <>
      <div onClick={handleSelectedCard} className={`cursor-pointer m-2 border-2 border-blue-600 min-h-[130px] 
        flex flex-col h-fit rounded-md ${isActive ? `bg-blue-200` : `bg-gray-200`} `}>
        <div className=' p-2 text-white font-semibold bg-gray-600'>
          <p className='flex gap-2'><span> {value.id}</span>{value.date}</p>
        </div>
        <div className='p-4 flex sm:flex-row flex-col justify-center items-center font-semibold'>
          <div className='flex md:w-1/2 w-full flex-col gap-2' >
            <p >
              <span>
                {
                  value?.type === "SMS" ? (<span className='flex items-center gap-2' ><FcSms size={30} color="blue" />{value.type}</span>) 
                  : value?.type === "Whatsapp" ? (<span className='flex items-center gap-2' ><IoLogoWhatsapp size={30} color="green" />{value.type}</span>) 
                  : value?.type === "Email" ? (<span className='flex items-center gap-2' ><FcSms size={30} color="black" />{value.type}</span>) : ""
                }
              </span>
            </p>
            <p>
              {
                value?.campaignStatus === "completed" ? (<span className='flex text-blue-800 items-center gap-2'> <BsFillCheckCircleFill size={30} color="blue" /> Completed </span>) :
                  value?.campaignStatus === "pending" ?  (<span className='flex text-red-800 items-center gap-2'> <BsFillCheckCircleFill size={30} color="red" /> Pending </span>) : ""
              }
            </p>
          </div>
          <div className='md:w-1/2 w-full flex flex-col gap-2' >
            <p className='flex items-center gap-2'>
              <span>
                <FaCalendarCheck size={30} color="violet" />
              </span>
              {value?.date}
            </p>
            <p className='flex items-center gap-2' >
              <BsPersonCircle size={30} color="blue" />
              KonceptLaw
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CampaignsCard
