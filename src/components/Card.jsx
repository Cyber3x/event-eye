import React from 'react'

const Card = ({ children, className }) => {
  return (
    <section
      className={
        'p-6 bg-white shadow-lg xl:p-8 rounded-xl mt-10' + ' ' + className
      }
    >
      {children}
    </section>
  )
}

const Header = ({ letter, title, description, bg }) => {
  return (
    <header className="flex">
      <div>
        <h1
          className={
            'flex items-center justify-center w-20 h-20 text-5xl font-bold text-white rounded-full bg-gradient-to-br font-roboto' +
            ' ' +
            bg
          }
        >
          {letter}
        </h1>
      </div>
      <div className="ml-6">
        <h1 className="text-xl font-bold text-gray-600 font-opensans">
          {title}
        </h1>
        <p className="mt-3 text-sm font-semibold text-gray-400 font-opensans">
          {description}
        </p>
      </div>
    </header>
  )
}

const Button = ({ className, children, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={
        'w-full font-opensans font-semibold text-md rounded-lg py-3 ' +
        className
      }
    >
      {children}
    </button>
  )
}

const Body = ({ children }) => {
  return <div className="mt-8">{children}</div>
}

Card.Header = Header
Card.Body = Body
Card.Button = Button

export default Card
