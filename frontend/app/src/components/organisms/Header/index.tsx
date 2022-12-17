import Link from 'next/link'
import React from 'react'
import { signOutServerSideProps } from '../../../services/auth/signout'

const Header = () => {
  const signout = () => {
    signOutServerSideProps('auth/sign_out')
  }

  return (
    <div>
      {' '}
      <Link href="/signin">
        <button>Sign in</button>
      </Link>
      <Link href="/">
        <button>Top</button>
      </Link>
      <span>
        <input />
      </span>
      <button>検索</button>
      <Link href="/">
        <button>お気に入り</button>
      </Link>
      <Link href="/">
        <button>メッセージ</button>
      </Link>
      <Link href="/userprofile">
        <button>profile</button>
      </Link>
      <button onClick={signout}>sign out</button>
    </div>
  )
}

export default Header
