import React from 'react'
import styled from 'styled-components'

interface InputProps {
  width?: string
  height?: string
  backgroundColorOnHovered?: string
  backgroundColor?: string
  border?: string
  borderOnFocused?: string
  borderRadius?: string
  color?: string
  fontWeight?: string
  fontSize?: string
  padding?: string
  position?: string
  margin?: string
  type?: string
  name?: string
  step?: string
  min?: string
  max?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  paddingLeft?: string
  outline?: string
  autoComplete?: string
}

const InputStyled = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  padding-left: ${(props) => props.paddingLeft};
  position: ${(props) => props.position};
  margin: ${(props) => props.margin};
  outline: ${(props) => props.outline};
  autoComplete: ${(props) => props.autoComplete};
  &:focus {
    border: ${(props) => props.borderOnFocused};
      }
  }
`

export const Input = ({
  width,
  height,
  backgroundColor,
  border,
  borderOnFocused = '1px solid rgb(256, 256, 256)',
  borderRadius,
  color,
  fontWeight,
  fontSize,
  padding,
  position,
  margin,
  type,
  name,
  step,
  min,
  max,
  value,
  onChange,
  placeholder,
  required,
  paddingLeft,
  outline,
  autoComplete = 'off',
}: InputProps) => {
  return (
    <InputStyled
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      borderOnFocused={borderOnFocused}
      border={border}
      borderRadius={borderRadius}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
      padding={padding}
      position={position}
      margin={margin}
      type={type}
      name={name}
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      paddingLeft={paddingLeft}
      outline={outline}
      autoComplete={autoComplete}
    />
  )
}
