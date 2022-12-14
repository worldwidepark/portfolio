import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { withAuthServerSideProps } from '../services/auth/signin'
import Cookies from 'js-cookie'
// export const getServerSideProps = withAuthServerSideProps('auth/sessions')

// export const withAuthServerSideProps = (url) => {
//   fetch(`http://localhost:3001/api/v1/${url}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }

withAuthServerSideProps('auth/sessions')
console.log(Cookies.get('client'))
console.log(Cookies.get('access-token'))

const index = () => {
  return (
    <>
      <div>これ見れます？</div>
      <button>sign in</button>
    </>
  )
}

export default index
