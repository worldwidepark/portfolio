import React from 'react'

export const Box = (props) => {
  const { width, backgroundColor = 'wheat', children, onClick } = props

  const boxStyle = {
    width: width,
    background: backgroundColor,
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    fontSize: '16px',
    margin: '5px',
    padding: '5px',
  }

  return (
    <div style={boxStyle} onClick={onClick}>
      {children}
    </div>
  )
}
