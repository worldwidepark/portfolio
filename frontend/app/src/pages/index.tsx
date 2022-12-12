import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { withAuthServerSideProps } from '../services/auth/signin'

export const getServerSideProps: GetServerSideProps =
  withAuthServerSideProps('/api/v1/auth')

const index = () => {
  return <div>これ見れます？</div>
}

export default index
