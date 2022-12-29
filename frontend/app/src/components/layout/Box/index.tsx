import React from 'react'

export const Box = (props) => {
  const { width, height, backgroundColor = 'wheat', children, onClick } = props

  const boxStyle = {
    width: width,
    height: height,
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
