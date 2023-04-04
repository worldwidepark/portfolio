import React from 'react'
import { Box } from '../../layout/Box'
import styled from 'styled-components'

const Header = () => {
  const HeaderStyle = styled.div`
    position: relative;
    top: 20px;
    padding: 25px;
    backgroud-color: rgb(15, 20, 25);
  `
  return <HeaderStyle></HeaderStyle>
}

export default Header
