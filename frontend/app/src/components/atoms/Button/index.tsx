import React from 'react'

export const Button = (props) => {
  const { children, buttonColor, onClick } = props
  const buttonStyle = {
    background: buttonColor,
    border: 'none',
    color: 'white',
    fontSize: '16px',
    margin: '5px',
  }

  return (
    <button style={buttonStyle} onClick={onClick} type="button">
      {children}
    </button>
  )
}
