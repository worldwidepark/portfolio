import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Box } from '../../layout/Box'

const Sidebar = () => {
  // const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate)

  const SidebarBox = styled.div`
    width: 15%;
    height: 100vh;
    border-right: 1px solid gray;
  `
  // ボタンでもいいかも
  const SidebarList = styled.div`
    padding: 25px;
    margin: 10px;
    cursor: pointer;
    text-align: center;
    background-color: #e0ffff;
  `

  return (
    <>
      <SidebarBox>
        <Link href="mystudy">
          <SidebarList>日報</SidebarList>
        </Link>
        <Link href="achivement">
          <SidebarList>成果</SidebarList>
        </Link>
        <Link href="presentation">
          <SidebarList>出力画面の見出し</SidebarList>
        </Link>
        <SidebarList>
          ユーザープロフィール<h3>プログラミング言語</h3>
        </SidebarList>
        <SidebarList>学習者一覧</SidebarList>
      </SidebarBox>
    </>
  )
}

export default Sidebar
