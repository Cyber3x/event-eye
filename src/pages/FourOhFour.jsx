import React from 'react'
import { Link } from 'react-router-dom'

const FourOhFour = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-6xl font-medium text-blue-800">
        <Link to="/">
          4-OH-4 page not found. <br />
          Go to the ladnding page
        </Link>
      </h1>
    </div>
  )
}

export default FourOhFour
