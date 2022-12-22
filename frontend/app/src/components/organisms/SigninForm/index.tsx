import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { signin } from '../../../services/auth/signin'
import { AuthContext } from '../../../contexts/AuthContext'

const SigninForm = () => {
  const router = useRouter()
  const { setIsSignedIn, authMessage } = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await signin(data)

    setIsSignedIn(true)
    router.push('/')
  }

  return (
    <>
      <div>{authMessage}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Emailを入力してください。"
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            placeholder="passwordを入力してください。"
          />
        </div>
        <button type="submit">sign in</button>
      </form>
    </>
  )
}
export default SigninForm
