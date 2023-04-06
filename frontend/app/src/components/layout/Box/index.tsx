import React from 'react'

export const Box = (props) => {
  const {
    top,
    bottom,
    left,
    right,
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
    overflow,
    wordBreak,
    margin,
  } = props

  const boxStyle = {
    top: top,
    bottom: bottom,
    right: right,
    left: left,
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
    overflow: overflow,
    wordBreak: wordBreak,
    margin: margin,
  }

  return (
    <div style={boxStyle} onClick={onClick}>
      {children}
    </div>
  )
}
