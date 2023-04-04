import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../organisms/Header'
import styled from 'styled-components'
import { Sidebar } from '../../organisms/Sidebar'
import { Flex } from '../../layout/Flex'
interface LayoutProps {
  children: React.ReactNode
}

const BodyStyle = styled.div`
  position: relative;
  color: rgb(15, 20, 25);
`
const MainStyle = styled.div`
  position: relative;
  left: 12%;
  height: 100vh;
  color: rgb(15, 20, 25);
`
const Layout = ({ children }: LayoutProps) => {
  const { isSignedIn } = useContext(AuthContext)
  const HeaderTag = () => {
    if (isSignedIn) return <Header />
    else {
      return <></>
    }
  }

  return (
    <>
      <BodyStyle>
        <Sidebar />
        <HeaderTag />
        <Flex flexDirection="row">
          <MainStyle>
            <main>{children}</main>
          </MainStyle>
        </Flex>
      </BodyStyle>
    </>
  )
}

export default Layout
