import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'

const login = () => {
  const router = useRouter()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3001/api/v1/`,
      headers: {
        'content-type': 'application/json',
      },
    })
    ;(async () => {
      return await axiosInstance
        .post('auth/sign_in', {
          email: data.get('email'),
          password: data.get('password'),
        })
        .then(function (response) {
          // Cookieにトークンをセットしています
          Cookies.set('uid', response.headers['uid'])
          Cookies.set('client', response.headers['client'])
          Cookies.set('access-token', response.headers['access-token'])
          router.push('/index')
        })
    })()
  }
  return (
    <>
      <div>
        <input type="text" placeholder="Emailを入力してください。" />
      </div>
      <div>
        <input type="text" placeholder="passwordを入力してください。" />
      </div>
      <button onSubmit={handleSubmit}>sign in</button>
    </>
  )
}
export default login
