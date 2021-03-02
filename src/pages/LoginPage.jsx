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
      setError('Greška tjekom prijave.')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto mt-20 w-2/5 mb-32">
      <h1 className="font-semibold text-center text-4xl mb-10 font-roboto">
        Prijava
      </h1>
      {error && <AuthError error={error} />}
      <form onSubmit={handleLogin}>
        <AuthInput
          onChange={(value) => setEmail(value)}
          lable="Email"
          placeholder={'Email'}
        />
        <AuthInput
          onChange={(value) => setPassword(value)}
          lable="Loznika"
          type="password"
          placeholder="Loznika"
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 p-2 w-full rounded-lg text-white font-semibold mt-4 font-opensans"
          type="submit"
          disabled={loading}
        >
          Prijavi se
        </button>
      </form>
      <div className="text-center mt-5">
        <Link
          to="/forgot-password"
          className="block mb-4 text-purple-700 font-roboto"
        >
          Zaboravili ste lozinku?
        </Link>
        <p className="font-opensans">
          Nemate račun?{' '}
          <Link to="/signup" className="text-purple-700">
            Registrirajte se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
