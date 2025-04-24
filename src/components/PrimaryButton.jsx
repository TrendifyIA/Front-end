import React from 'react'

const PrimaryButton = (props) => {
  return (
    <div class="bg-primary-500 flex justify-center items-center border-2 border-gray-50 rounded-[5px] text-white py-2 px-4 cursor-pointer hover:scale-105">
      {props.texto}
    </div>
  )
}

export default PrimaryButton
