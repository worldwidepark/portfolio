import React from 'react'

export const Flex = (props) => {
  const {
    borderRadius,
    backgroundColor,
    children,
    width,
    flexDirection,
    alignItems,
    alignContent,
    justifyContent,
    justifyItems,
    textAlign,
    border = 'none',
    borderRight,
    margin,
    padding,
    position,
    top,
    right,
    left,
    bottom,
  } = props

  const flexStyle = {
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    width: width,
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: alignItems,
    alignContent: alignContent,
    justifyContent: justifyContent,
    justifyItems: justifyItems,
    textAlign: textAlign,
    border: border,
    borderRight: borderRight,
    margin: margin,
    padding: padding,
    position: position,
    top: top,
    right: right,
    left: left,
    bottom: bottom,
  }

  return <div style={flexStyle}>{children}</div>
}
