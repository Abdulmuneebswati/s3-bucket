import React from 'react'

const Input = ({htmlFor,type,labelText,handleChange}) => {
  return (
    <div className="">
            <label
              htmlFor={htmlFor}
              className="block text-sm font-semibold text-gray-800"
            >
              {labelText}
            </label>
            <input
              type={type}
              name={type}
              onChange={(e)=>handleChange(e)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
  )
}

export default Input
