import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Header from '../components/organisms/Header'
import SignInForm from '../components/organisms/SigninForm'
// export const getServerSideProps = withAuthServerSideProps('auth/sessions')

// export const withAuthServerSideProps = (url) => {
//   fetch(`http://localhost:3001/api/v1/${url}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }

// loginCheck('auth/sessions')
console.log(Cookies.get('client'))
console.log(Cookies.get('access-token'))

const index = () => {
  return <></>
}

export default index
