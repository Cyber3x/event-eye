import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NavbarLink = (props) => {
  return (
    <Link
      to={props.to}
      className={`
        mr-10 font-opensans font-semibold text-lg 3xl:text-xl ${props?.color} ${props.className}
      `}
      onClick={props?.onClick}
    >
      <p>{props.text}</p>
    </Link>
  )
}

const Navbar = () => {
  const { logout, currentUser } = useAuth()
  const location = useLocation()
  const history = useHistory()

  const shouldFillBackground =
    location.pathname !== '/' &&
    !location.pathname.startsWith('/event/') &&
    !location.pathname.startsWith('/login') &&
    !location.pathname.startsWith('/signup')

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
          {currentUser ? (
            <>
              <NavbarLink
                to="/create"
                text="Izradi događaj"
                color={textColor}
              />
              {/* <NavbarLink to="/dashboard" text="Profil" color={textColor} /> */}

              <NavbarLink
                to="#"
                text="Odjavi se"
                color={textColor}
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <NavbarLink
                text="Prijava"
                to="/login"
                className="transition-colors rounded-md px-14 hover:text-white hover:bg-purple-700 h-10 flex items-center"
              />
              <NavbarLink
                text="Registracija"
                to="/signup"
                className="transition-colors rounded-md px-14 hover:text-white hover:bg-purple-700 text-purple-700 h-10 flex items-center"
              />
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
