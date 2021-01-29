import React from 'react'

const Input = (props) => {
  return (
    <div className="w-full">
      <p className="pb-2 text-md font-medium text-purple-700 font-robot 3xl:text-lg">
        {props.lable}
      </p>
      <input
        type="text"
        className="w-11/12 py-2 text-lg font-medium placeholder-gray-500 transition-colors border-b-2 border-gray-500 font-opensans focus:outline-white focus:border-purple-700 3xl:text-xl"
        placeholder={props.placeholder}
      />
    </div>
  )
}

const SearchBar = (props) => {
  const className = props.className ? props.className : ''
  return (
    <div
      className={
        'flex px-10 py-6 shadow-lg bg-white z-50 rounded-xl  3xl:py-10 3xl:px-12' +
        ' ' +
        className
      }
    >
      <div className="flex justify-around flex-grow">
        <Input placeholder="Travis Scot concert" lable="Event name" />
        <Input placeholder="Zagreb" lable="Event location" />
        <Input placeholder="11. / 12. / 2020." lable="Event date" />
      </div>
      <button className="p-5 text-purple-700 transition-colors bg-purple-300 rounded-lg hover:bg-purple-700 hover:text-white w-20 h-20 focus:outline-none focus:border-purple-700 border-2 border-purple-300 hover:border-purple-700 3xl:w-22 3xl:h-22">
        <svg
          className="stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
