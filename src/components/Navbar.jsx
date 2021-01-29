import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateNavbarLink = (props) => {
  return (
    <Link
      to={props.to}
      className={
        'mr-10 font-opensans font-semibold text-lg 3xl:text-xl' + props.color
      }
      onClick={props?.onClick}
    >
      <p>{props.text}</p>
    </Link>
  )
}

const PrivateNavbar = () => {
  const { logout } = useAuth()
  const location = useLocation()
  const history = useHistory()

  const shouldFillBackground =
    location.pathname !== '/' && !location.pathname.startsWith('/event/')

  const handleLogout = async () => {
    try {
      await logout()
      history.push('/')
    } catch (error) {
      console.error('[ERROR LOGOUT]:', error)
    }
  }

  const textColor = shouldFillBackground ? ' text-white' : ' text-purple-700'

  return (
    <div className={'w-full' + (shouldFillBackground ? ' bg-purple-800' : '')}>
      <nav className="flex items-center justify-between w-3/4 h-28 mx-auto my-auto 3xl:h-36">
        <Link to="/">
          <p
            className={
              'font-semibold text-3xl 3xl:text-4xl font-opensans ' + textColor
            }
          >
            Event Eye
          </p>
        </Link>
        <div className="flex">
          <PrivateNavbarLink
            to="create"
            text="Create an event"
            color={textColor}
          />
          <PrivateNavbarLink
            to="/dashboard"
            text="Dashboard"
            color={textColor}
          />

          <PrivateNavbarLink
            to="#"
            text="Logout"
            color={textColor}
            onClick={handleLogout}
          />
        </div>
      </nav>
    </div>
  )
}

const PublicNavbar = () => {
  return (
    <nav className="flex justify-between w-3/4 mx-auto h-28">
      <Link
        to="/"
        className="flex h-12 my-auto ml-10 text-3xl 3xl:text-4xl font-bold text-purple-700 rounded-md py-auto px-14 hover:text-purple-800 transition-colors"
      >
        <p className="my-auto font-opensans">EventEye</p>
      </Link>
      <div className="flex my-auto">
        <Link
          to="/login"
          className="flex h-12 mr-10 transition-colors rounded-md px-14 hover:bg-purple-700  hover:text-white"
        >
          <p className="my-auto font-roboto text-lg">Login</p>
        </Link>
        <Link
          to="/signup"
          className="flex h-12 mr-10 transition-colors rounded-md px-14 hover:text-white hover:bg-purple-700 text-purple-700"
        >
          <p className="my-auto font-roboto text-lg font-medium ">Sign up</p>
        </Link>
      </div>
    </nav>
  )
}

const Navbar = () => {
  const { currentUser } = useAuth()
  return currentUser ? <PrivateNavbar /> : <PublicNavbar />
}

export default Navbar
