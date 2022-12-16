import Link from 'next/link'
import React from 'react'

const Header = () => {
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
      <Link href="/">
        <button>profile</button>
      </Link>
    </div>
  )
}

export default Header
