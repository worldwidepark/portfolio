import React from 'react'

export const Text = (props) => {
  const { children, fontSize = 'md', color } = props
  let fontSizePx
  switch (fontSize) {
    case 'lg':
      fontSizePx = '30px'
      break
    case 'md':
      fontSizePx = '20px'
      break
    case 'sm':
      fontSizePx = '15px'
      break
  }

  const textStyle = {
    border: 'none',
    color: 'white',
    fontSize: fontSizePx,
    margin: '5px',
    padding: '5px',
  }

  return <div style={textStyle}>{children}</div>
}
