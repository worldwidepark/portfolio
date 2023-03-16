import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SignupForm from '../components/organisms/SignupForm'
import { AuthContext } from '../contexts/AuthContext'
import Layout from '../components/templates/Layout'

const signup = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  if (isSignedIn) router.push('/')
  return (
    <Layout>
      <SignupForm />
      <Link href="/signin">
        <button>Sign in</button>
      </Link>
    </Layout>
  )
}
export default signup
