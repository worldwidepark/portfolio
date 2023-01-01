import React from 'react'
import styled from 'styled-components'
import { Box } from '../../layout/Box'

const Sidebar = ({ setActiveLists }) => {
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
        <SidebarList onClick={() => setActiveLists('dailyReports')}>
          日報
        </SidebarList>
        <SidebarList onClick={() => setActiveLists('achives')}>
          成果
        </SidebarList>
        <SidebarList onClick={() => setActiveLists('showMyAchives')}>
          出力画面の見出し
        </SidebarList>
        <SidebarList>
          ユーザープロフィール<h3>プログラミング言語</h3>
        </SidebarList>
      </SidebarBox>
    </>
  )
}

export default Sidebar
