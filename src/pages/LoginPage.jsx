import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Comps
import AuthInput from '../components/AuthInput'
import AuthError from '../components/AuthError'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      history.push('/')
    } catch (error) {
      setError('Failed to log in.')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto mt-24 w-2/5">
      <h1 className="font-semibold text-center text-4xl mb-10">Login</h1>
      {error && <AuthError error={error} />}
      <form onSubmit={handleLogin}>
        <AuthInput
          onChange={(value) => setEmail(value)}
          lable="Email"
          placeholder={'Email'}
        />
        <AuthInput
          onChange={(value) => setPassword(value)}
          lable="Password"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-blue-400 p-2 w-full rounded-lg text-white font-semibold mt-4"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        <Link to="/forgot-password" className="block mb-4 text-blue-700">
          Forgot password?
        </Link>
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-700">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
