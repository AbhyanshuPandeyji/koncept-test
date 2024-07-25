import React from 'react'
import { FaCalendarCheck } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { AiOutlineFileWord } from "react-icons/ai";

// for data show
import { FcSms } from "react-icons/fc";
import { IoLogoWhatsapp } from "react-icons/io";
// import { getWordDocumentFileThunkMiddleware } from '../../../../redux/features/campaigns';
import { useDispatch } from 'react-redux';

const DocumentTemplateCard = ({ value,
  handleSelectedCard,
  // handleFileUrl,
  isActive }) => {
  const dispatch = useDispatch()

  //   const  handleWordFileReq = (item) =>{

  //         dispatch(getWordDocumentFileThunkMiddleware({filePath: item.path}))
  // }

  return (
    <>
      <div onClick={() => {
        handleSelectedCard();
        // handleWordFileReq();
        // handleFileUrl();
        // handleWordFileReq(value.path);
      }}
        className={`cursor-pointer m-2 border-2 border-blue-600 min-h-[130px] 
        flex flex-col h-fit rounded-md ${isActive ? `bg-blue-200` : `bg-gray-200`} `}>
        <div className=' p-2 text-white font-semibold bg-gray-600'>
          <p className='flex gap-2'><span>{value.id}</span>{value.date}</p>
        </div>
        <div className='p-4 flex sm:flex-row flex-col justify-center items-center font-semibold'>
          <div className='flex md:w-1/2 w-full flex-col gap-2' >
            <p >
              <span>
                <span className='flex items-center gap-2' ><FaLanguage size={30} />{value.category}</span>
              </span>
            </p>
            <p>
              <span className='flex text-blue-800 items-center gap-2'><AiOutlineFileWord size={30} color="blue" />{value?.fileType}</span>
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
              <FaUserCircle size={30} color="blue" />
              {value?.userName}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentTemplateCard
