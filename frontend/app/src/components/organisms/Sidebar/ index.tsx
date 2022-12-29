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
        <SidebarList onClick={() => setActiveLists('users')}>
          人材一覧
        </SidebarList>
        <SidebarList onClick={() => setActiveLists('jobs')}>
          会社一覧
        </SidebarList>
        <SidebarList onClick={() => setActiveLists('likes')}>
          お気に入り
        </SidebarList>
        <SidebarList></SidebarList>
      </SidebarBox>
    </>
  )
}

export default Sidebar
