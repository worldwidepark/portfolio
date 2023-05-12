import React from 'react'
import styled from 'styled-components'

type BoxProps = {
  display?: number | string
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  width?: number | string
  height?: number | string
  backgroundColor?: string
  backgroundColorOnHovered?: string
  border?: string
  borderRadius?: number | string
  color?: string
  colorOnHovered?: string
  cursor?: string
  fontWeight?: number | string
  fontSize?: number | string
  padding?: number | string
  children?: React.ReactNode
  onClick?: () => void
  position?: string
  textAlign?: string
  textShadow?: string
  overflow?: string
  wordBreak?: string
  margin?: number | string
  whiteSpace?: string
  textOverflow?: string
  boxShadow?: string
}

const BoxContainer = styled.div<BoxProps>`
  display: ${(props) => props.display};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.textAlign};
  text-shadow: ${(props) => props.textShadow};
  overflow: ${(props) => props.overflow};
  word-break: ${(props) => props.wordBreak};
  margin: ${(props) => props.margin};
  white-space: ${(props) => props.whiteSpace};
  cursor: ${(props) => props.cursor};
  text-overflow: ${(props) => props.textOverflow};
  cursor: ${(props) => props.cursor};
  &:hover {
    background-color: ${(props) => props.backgroundColorOnHovered};
    color: ${(props) => props.colorOnHovered};
  }
  box-shadow: ${(props) => props.boxShadow};
`

export const Box = ({
  display,
  top,
  bottom,
  left,
  right,
  width,
  height,
  backgroundColor,
  backgroundColorOnHovered = backgroundColor,
  border = 'none',
  borderRadius,
  color = 'black',
  colorOnHovered = color,
  cursor,
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
  whiteSpace,
  textOverflow,
  boxShadow,
}: BoxProps) => {
  return (
    <BoxContainer
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      backgroundColorOnHovered={backgroundColorOnHovered}
      colorOnHovered={colorOnHovered}
      cursor={cursor}
      border={border}
      borderRadius={borderRadius}
      color={color}
      fontWeight={fontWeight}
      fontSize={fontSize}
      padding={padding}
      position={position}
      textAlign={textAlign}
      textShadow={textShadow}
      overflow={overflow}
      wordBreak={wordBreak}
      margin={margin}
      whiteSpace={whiteSpace}
      onClick={onClick}
      textOverflow={textOverflow}
      boxShadow={boxShadow}
      display={display}
    >
      {children}
    </BoxContainer>
  )
}
