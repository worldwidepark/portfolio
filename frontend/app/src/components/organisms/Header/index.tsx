import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { signout } from '../../../services/auth/signout'
import { Button } from '../../atoms/Button'

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
        <Button buttonColor="salmon">Top</Button>
      </Link>
      <span>
        <input />
      </span>
      <button>検索</button>
      <Link href="/">
        <Button buttonColor="salmon">お気に入り</Button>
      </Link>
      <Link href="/">
        <Button>メッセージ</Button>
      </Link>
      <Link href="/userprofile">
        <Button>profile</Button>
      </Link>
      <Button onClick={signoutt}>sign out</Button>
    </div>
  )
}

export default Header
