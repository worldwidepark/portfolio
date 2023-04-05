import React from 'react'

export const Box = (props) => {
  const {
    width,
    height,
    backgroundColor,
    borderRadius,
    color,
    fontWeight,
    fontSize,
    padding,
    children,
    onClick,
    position,
    textAlign,
    textShadow,
  } = props

  const boxStyle = {
    width: width,
    height: height,
    backgroundColor: backgroundColor,
    border: 'none',
    borderRadius: borderRadius,
    color: color,
    fontWeight: fontWeight,
    fontSize: fontSize,
    padding: padding,
    position: position,
    textAlign: textAlign,
    textShadow: textShadow,
  }

  return (
    <div style={boxStyle} onClick={onClick}>
      {children}
    </div>
  )
}
