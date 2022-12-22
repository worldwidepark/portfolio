import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SigninForm from '../components/organisms/SigninForm'
import { AuthContext } from '../contexts/AuthContext'

const signin = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  if (isSignedIn) router.push('/')
  return (
    <>
      <SigninForm />
      <Link href="/signup">
        <button>Sign up</button>
      </Link>
    </>
  )
}
export default signin
