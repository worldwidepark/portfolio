import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Header from '../../organisms/Header'
interface LayoutProps {
  children: React.ReactNode
}

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
      <HeaderTag />
      <main>{children}</main>
    </>
  )
}

export default Layout
