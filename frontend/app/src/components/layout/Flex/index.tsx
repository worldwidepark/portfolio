import React from 'react'

export const Flex = (props) => {
  const {
    children,
    width,
    flexDirection,
    alignItems,
    alignContent,
    justifyContent,
    justifyItems,
    margin,
    padding,
  } = props

  const flexStyle = {
    width: width,
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: alignItems,
    alignContent: alignContent,
    justifyContent: justifyContent,
    justifyItems: justifyItems,
    border: 'none',
    margin: margin,
    padding: padding,
  }

  return <div style={flexStyle}>{children}</div>
}
