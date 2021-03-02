import React, { useEffect, useState, useRef } from 'react'

const Dropdown = ({ children, className, onChange }) => {
  const node = useRef()
  const [isOpen, setIsOpen] = useState()
  const [selectedId, setSelectedId] = useState(0)

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return
    }
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleChange = (newId) => {
    setSelectedId(newId)
    onChange(newId)
  }

  return (
    <div className="relative inline-block text-left" ref={node}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          'flex items-center px-4 py-2 text-sm font-semibold bg-gray-300 rounded-md 3xl:text-lg xl:ml-10 xl:px-6 font-opensans ' +
          className
        }
      >
        {children[selectedId].props.children}
        <svg
          className="w-6 h-6 ml-2 xl:ml-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          {children.map((child) => (
            <div
              key={child.props.id}
              className="py-1"
              onClick={() => handleChange(child.props.id)}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Item = ({ children }) => {
  return (
    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      {children}
    </p>
  )
}

Dropdown.Item = Item

export default Dropdown
