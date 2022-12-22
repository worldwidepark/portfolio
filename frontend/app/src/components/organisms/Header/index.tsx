import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { signout } from '../../../services/auth/signout'

const Header = () => {
  const router = useRouter()
  const signoutt = () => {
    signout()
    router.reload()
  }

  return (
    <div>
      {' '}
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
      <button onClick={signoutt}>sign out</button>
    </div>
  )
}

export default Header
