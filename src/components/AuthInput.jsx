import React from 'react'
import PropTypes from 'prop-types'

const AuthInput = (props) => {
  const { type, placeholder, lable, onChange } = props
  return (
    <div>
      <p className="font-semibold text-blue-700 mb-2">{lable}</p>
      <input
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 border-2 w-full border-gray-300 rounded-md mb-4"
      />
    </div>
  )
}

AuthInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  lable: PropTypes.string.isRequired,
}

AuthInput.defaultProps = {
  type: 'text',
  placeholder: 'Enter text',
}

export default AuthInput
