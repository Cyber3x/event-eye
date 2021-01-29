import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Comps
import AuthInput from '../components/AuthInput'
import AuthError from '../components/AuthError'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) return setError('Passwords do not match.')

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      history.push('/create')
    } catch (error) {
      setError('Failed to create an account.')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto mt-24 w-2/5">
      <h1 className="font-semibold text-center text-4xl mb-10">Signup</h1>
      {error && <AuthError error={error} />}
      <form onSubmit={handleSubmit}>
        <AuthInput
          lable="Email"
          placeholder={'Email'}
          onChange={(value) => setEmail(value)}
        />
        <AuthInput
          lable="Password"
          type="password"
          placeholder="Password"
          onChange={(value) => setPassword(value)}
        />
        <AuthInput
          lable="Confirm password"
          type="password"
          placeholder="Confirm password"
          onChange={(value) => setConfirmPassword(value)}
        />
        <button
          className="bg-blue-400 p-2 w-full rounded-lg text-white font-semibold mt-4"
          type="submit"
          disabled={loading}
        >
          Signup
        </button>
      </form>
      <h1 className="text-center mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </h1>
    </div>
  )
}

export default SignupPage
