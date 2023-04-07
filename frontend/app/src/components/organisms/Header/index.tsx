import React from 'react'
import { Box } from '../../layout/Box'
import styled from 'styled-components'

const HeaderStyle = styled.div`
  position: relative;
  top: -25px;
  padding: 25px;
  backgroud-color: rgb(15, 20, 25);
`
const Header = () => {
  return <HeaderStyle></HeaderStyle>
}

export default Header
