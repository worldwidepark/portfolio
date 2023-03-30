import React, { useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import { Sidebar } from '../components/organisms/Sidebar'
import { Flex } from '../components/layout/Flex'
import { DailyReportInputForm } from '../components/organisms/DailyReport'
import { getUserProfileListData } from '../services/userProfile/userProfile'
import { UserProfileList } from '../components/organisms/UserProfile/profileList'
import { Box } from '../components/layout/Box'
const index = () => {
  const [activeLists, setActiveLists] = useState('users')
  const [userProfileList, setUserProfileList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserProfileListData().then((listData) => {
      setUserProfileList(listData)
      setLoading(false)
      console.log(listData, 'listdata')
    })
  }, [])

  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            <UserProfileList userProfileList={userProfileList} />
          </>
        )}

        {/* <UserProfile userId=/> */}
      </Flex>
    </Layout>
  )
}

export default index
