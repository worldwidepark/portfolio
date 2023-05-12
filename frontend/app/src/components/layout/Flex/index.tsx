import React from 'react'
import styled from 'styled-components'

type FlexProps = {
  borderRadius?: string | number
  backgroundColor?: string
  width?: string | number
  height?: string | number
  flexDirection?: string
  alignItems?: string
  alignContent?: string
  justifyContent?: string
  justifyItems?: string
  textAlign?: string
  border?: string
  borderRight?: string
  margin?: string | number
  padding?: string | number
  position?: string
  top?: string | number
  right?: string | number
  left?: string | number
  bottom?: string | number
  color?: string
  overflow?: string
  overflowX?: string
  overflowY?: string
  fontSize?: string | number
  children?: any
  flexWrap?: string
}

const FlexContainer = styled.div<FlexProps>`
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  justify-content: ${(props) => props.justifyContent};
  justify-items: ${(props) => props.justifyItems};
  text-align: ${(props) => props.textAlign};
  border: ${(props) => props.border};
  border-right: ${(props) => props.borderRight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  color: ${(props) => props.color};
  overflow: ${(props) => props.overflow};
  overflow-x: ${(props) => props.overflowX};
  overflow-y: ${(props) => props.overflowY};
  font-size: ${(props) => props.fontSize};
  flex-wrap: ${(props) => props.flexWrap};
`

export const Flex = ({
  borderRadius,
  backgroundColor,
  children,
  width,
  height,
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
  color,
  overflow,
  overflowX,
  overflowY,
  fontSize,
  flexWrap,
}: FlexProps) => {
  return (
    <FlexContainer
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      flexDirection={flexDirection}
      alignItems={alignItems}
      alignContent={alignContent}
      justifyContent={justifyContent}
      justifyItems={justifyItems}
      textAlign={textAlign}
      border={border}
      borderRight={borderRight}
      margin={margin}
      padding={padding}
      position={position}
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      color={color}
      overflow={overflow}
      overflowX={overflowX}
      overflowY={overflowY}
      fontSize={fontSize}
      flexWrap={flexWrap}
    >
      {children}
    </FlexContainer>
  )
}
