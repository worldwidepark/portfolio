import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
  children: React.ReactNode
  backgroundColor?: string
  border?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  position?: string
  display?: string
  padding?: string
  cursor?: string
  textAlign?: string
  verticalAlign?: string
  borderRadius?: string
  backgroundColorOnhovered?: string
  margin?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  top?: string | number
  right?: string | number
  left?: string | number
  bottom?: string | number
  width?: string | number
  height?: string | number
  type?: 'button' | 'submit' | 'reset'
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  position: ${(props) => props.position};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  cursor: ${(props) => props.cursor};
  text-align: ${(props) => props.textAlign};
  vertical-align: ${(props) => props.verticalAlign};
  border-radius: ${(props) => props.borderRadius};
  margin: ${(props) => props.margin};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  &:hover {
    background-color: ${(props) => props.backgroundColorOnhovered};
  }
`

export const Button = ({
  children,
  backgroundColor,
  border = 'none',
  color,
  fontSize,
  fontWeight,
  lineHeight,
  position,
  display,
  padding,
  cursor,
  textAlign,
  verticalAlign,
  borderRadius,
  backgroundColorOnhovered,
  margin,
  onClick,
  type,
  top,
  right,
  left,
  bottom,
  width,
  height,
}: ButtonProps) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      border={border}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      position={position}
      display={display}
      padding={padding}
      cursor={cursor}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      borderRadius={borderRadius}
      backgroundColorOnhovered={backgroundColorOnhovered}
      margin={margin}
      onClick={onClick}
      type={type}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
    >
      {children}
    </StyledButton>
  )
}
