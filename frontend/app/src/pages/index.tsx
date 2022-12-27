import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Header from '../components/organisms/Header'
import SignInForm from '../components/organisms/SigninForm'
import { UserProfileList } from '../components/organisms/UserProfile'
import Layout from '../components/templates/Layout'
const index = () => {
  return (
    <Layout>
      <UserProfileList />
      {/* <UserProfile userId=/> */}
    </Layout>
  )
}

export default index
