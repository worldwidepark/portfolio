import Link from 'next/link'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../contexts/AuthContext'
import { Button } from '../../atoms/Button'
import { signout } from '../../../services/auth/signout'
import { useRouter } from 'next/router'
import {
  FaHome,
  FaBookOpen,
  FaFistRaised,
  FaFilter,
  FaUserAlt,
} from 'react-icons/fa'
import { getWindowSize } from '../../../hooks/getWindowSize'

const SidebarBox = styled.div`
  position: fixed;
  padding-top: 50px;
  width: 10%;
  height: 100vh;
  border-right: 1px solid rgb(230, 230, 230);
`
const SidebarList = styled.div`
  padding: 25px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  background-color: ${({ theme }) => theme.main};
  color: rgb(15, 20, 25);
  border-radius: 30px;
  &:hover {
    background-color: rgb(246, 208, 66);
  }
`
export const Sidebar = () => {
  const [sidebarList, setSidebarList] = useState<
    {
      id: number
      listName: string
      href: string
      hrefCheack: string
      item: ReactNode
    }[]
  >([{ id: 1, listName: 'Home', href: '/', hrefCheack: '/', item: <FaHome /> }])
  const { currentUserId, isSignedIn } = useContext(AuthContext)
  const { height, width } = getWindowSize()

  useEffect(() => {
    if (isSignedIn && sidebarList.length === 1) {
      setSidebarList([
        ...sidebarList,
        {
          id: 2,
          listName: 'Daily Report',
          href: '/dailyreport',
          hrefCheack: '/dailyreport',
          item: <FaBookOpen />,
        },
        {
          id: 3,
          listName: 'Achivement',
          href: '/achivement',
          hrefCheack: '/achivement',
          item: <FaFistRaised />,
        },
        {
          id: 4,
          listName: 'Presentation',
          href: '/presentation',
          hrefCheack: '/presentation',
          item: <FaFilter />,
        },
        {
          id: 5,
          listName: 'User Profile',
          href: `/userprofile/${currentUserId}`,
          hrefCheack: '/userprofile/[user_id]',
          item: <FaUserAlt />,
        },
      ])
    }
  }, [isSignedIn])

  const router = useRouter()
  const signoutUser = () => {
    signout()
    router.reload()
  }

  return (
    <>
      <SidebarBox>
        {sidebarList.map((sidebar) => (
          <Link key={sidebar.id} href={sidebar.href}>
            {
              <SidebarList
                theme={
                  router.route === sidebar.hrefCheack
                    ? { main: 'rgb(246, 208, 66)' }
                    : { main: 'rgb(250, 250, 250)' }
                }
              >
                <p>{sidebar.item}</p>
                {width > 1700 ? <p>{sidebar.listName}</p> : <></>}
              </SidebarList>
            }
          </Link>
        ))}
        <Button onClick={signoutUser}>sign out</Button>
      </SidebarBox>
    </>
  )
}
