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
      history.push('/')
    } catch (error) {
      setError('Greška pri izradi novog računa.')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto mt-20 w-2/5 mb-16">
      <h1 className="font-semibold text-center text-4xl mb-10 font-roboto">
        Registracija
      </h1>
      {error && <AuthError error={error} />}
      <form onSubmit={handleSubmit}>
        <AuthInput
          lable="Email"
          placeholder={'Email'}
          onChange={(value) => setEmail(value)}
        />
        <AuthInput
          lable="Loznika"
          type="password"
          placeholder="Lozinka"
          onChange={(value) => setPassword(value)}
        />
        <AuthInput
          lable="Ponovljena lozinka"
          type="password"
          placeholder="Ponovljena lozinka"
          onChange={(value) => setConfirmPassword(value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 p-2 w-full rounded-lg text-white font-semibold mt-4 font-opensans"
          type="submit"
          disabled={loading}
        >
          Registriraj se
        </button>
      </form>
      <h1 className="text-center mt-5 font-opensans">
        Imate postojeći račun?{' '}
        <Link to="/login" className="text-purple-700">
          Prijavi se
        </Link>
      </h1>
    </div>
  )
}

export default SignupPage
