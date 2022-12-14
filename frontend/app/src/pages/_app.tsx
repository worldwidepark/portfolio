import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/auth/isLogin'
import Router, { useRouter } from 'next/router'
import Header from '../components/organisms/Header'
import { AuthContext } from '../contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState()
  const [authMessage, setAuthMessage] = useState('')

  const router = useRouter()
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res.data.is_login === true) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        console.log(res?.data.data)
      } else {
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
      return router.push('/signin')
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [isSignedIn])

  const HeaderTag = () => {
    if (isSignedIn) return <Header />
    else {
      return <></>
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
          authMessage,
          setAuthMessage,
        }}
      >
        <HeaderTag />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  )
}
