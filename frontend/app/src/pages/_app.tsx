import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/auth/isLogin'
import Router, { useRouter } from 'next/router'
import Header from '../components/organisms/Header'
import { AuthContext } from '../contexts/AuthContext'
import { getUserProfileData } from '../services/userprofile/userInfo'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState()
  const [authMessage, setAuthMessage] = useState('')
  const [currentUserId, setCurrentUserId] = useState(false)
  const [combinedTime, setCombinedTime] = useState(0)
  const router = useRouter()
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res.data.is_login === true) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        setCurrentUserId(res.data.data.id)
        console.log('_app handleGetCurrentUser')
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
    if (typeof currentUserId == 'number') {
      getUserProfileData(currentUserId).then((data) => {
        setCombinedTime(data.user.combined_time)
      })
    }
  })
  useEffect(() => {
    handleGetCurrentUser()
  }, [isSignedIn])

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
          currentUserId,
          setCurrentUserId,
          authMessage,
          setAuthMessage,
          combinedTime,
          setCombinedTime,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  )
}
