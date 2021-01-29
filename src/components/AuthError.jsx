import React from 'react'

const AuthError = (props) => {
  return (
    <p
      className={
        'py-4 px-8 bg-red-200 text-gray-600 font-medium mb-4 rounded-md ' +
        props.className
      }
    >
      {props.error}
    </p>
  )
}

export default AuthError
