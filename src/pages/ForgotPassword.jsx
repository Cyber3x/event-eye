import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import { Link } from 'react-router-dom'

// COMPS
import AuthError from '../components/AuthError'
import AuthInput from '../components/AuthInput'
const ForgotPassword = () => {
  const { resetPassword } = useAuth()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleResetPassowrd = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      setMessage('')
      await resetPassword(email)
      setMessage('Check your inbox for further instructions.')
    } catch (error) {
      setError('Greška pri postavljanju nove lozinke.')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto mt-24 w-2/5">
      <h1 className="font-semibold text-center text-4xl mb-10">
        Password reset
      </h1>
      {error && <AuthError error={error} />}
      {message && <AuthError error={message} className="bg-green-200" />}
      <form onSubmit={handleResetPassowrd}>
        <AuthInput
          onChange={(value) => setEmail(value)}
          lable="Email"
          placeholder={'Email'}
        />
        <button
          className="bg-blue-400 p-2 w-full rounded-lg text-white font-semibold mt-4"
          type="submit"
          disabled={loading}
        >
          Reset
        </button>
      </form>
      <p className="text-center mt-4">
        <Link to="/login" className="block mb-4 text-blue-700">
          Login
        </Link>
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-700">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default ForgotPassword
