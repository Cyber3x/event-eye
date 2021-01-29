import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const DashboardPage = () => {
  const { currentUser } = useAuth()
  return (
    <div>
      <h1>Email: {currentUser.email}</h1>
      <p>UID: {currentUser.uid}</p>
    </div>
  )
}

export default DashboardPage
