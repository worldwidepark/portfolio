import Link from 'next/link'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../contexts/AuthContext'
import { Box } from '../../layout/Box'

export const Sidebar = () => {
  const { currentUserId } = useContext(AuthContext)
  const SidebarBox = styled.div`
    width: 15%;
    height: 100vh;
    border-right: 1px solid gray;
  `
  // todo:ボタンでもいいかも
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
        <Link href="/dailyreport">
          <SidebarList>日報</SidebarList>
        </Link>
        <Link href="/achivement">
          <SidebarList>成果</SidebarList>
        </Link>
        <Link href="/presentation">
          <SidebarList>出力画面の見出し</SidebarList>
        </Link>
        <Link href={`/userprofile/${currentUserId}`}>
          <SidebarList>
            ユーザープロフィール<h3>プログラミング言語</h3>
          </SidebarList>
        </Link>
        <SidebarList>学習者一覧</SidebarList>
      </SidebarBox>
    </>
  )
}
