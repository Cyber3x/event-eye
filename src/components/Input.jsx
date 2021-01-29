import React from 'react'

import TextareaAutosize from 'react-textarea-autosize'

const Input = ({
  type,
  className,
  placeholder,
  lable,
  multiline,
  onChange,
  value,
}) => {
  return (
    <div className={className}>
      <p className="mb-2 text-sm font-bold text-gray-600 font-opensans mt-4">
        {lable}
      </p>
      {multiline ? (
        <TextareaAutosize
          onChange={(e) => onChange(e.target.value)}
          minRows={4}
          type={type}
          className="w-full p-4 text-xs font-semibold text-purple-700 placeholder-gray-400 border-2 border-gray-300 outline-none rounded-xl font-opensans focus:border-purple-700"
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          onChange={(e) => onChange(e.target.value)}
          type={type}
          className="w-full p-4 text-xs font-semibold text-purple-700 placeholder-gray-400 border-2 border-gray-300 outline-none rounded-xl font-opensans focus:border-purple-700"
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
