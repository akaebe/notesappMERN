import React from 'react'
import {LuCheck} from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
import { useEffect } from 'react'
const Toast = ({isShown ,msg,type,onClose}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose()

    },3000)
    return () => clearTimeout(timeoutId)
  },[onClose])
  return (
    <div
    className={`absolute top-20 right-6 transition-opacity duration-400 ${
      isShown ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ pointerEvents: isShown ? 'auto' : 'none' }}
  >
    <div
      className={`min-w-[240px] max-w-[300px] bg-white border shadow-2xl rounded-md overflow-hidden after:w-[5px] after:h-full ${
        type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'
      } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
    >
      <div className='flex items-center gap-3 px-4 py-2'>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            type === 'delete' ? 'bg-red-50' : 'bg-green-50'
          }`}
        >
          {type === 'delete' ? (
            <MdDeleteOutline className='text-xl text-red-500' />
          ) : (
            <LuCheck className='text-xl text-green-500' />
          )}
        </div>
        <p className='text-sm text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis'>
          {msg}
        </p>
      </div>
    </div>
  </div>
  )
}

export default Toast