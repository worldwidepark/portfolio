import React, { useState } from 'react'
import { UserProfileList } from '../components/organisms/UserProfile'
import Layout from '../components/templates/Layout'
import { Sidebar } from '../components/organisms/Sidebar'
import { Flex } from '../components/layout/Flex'
import { DailyReportInputForm } from '../components/organisms/DailyReport'
const index = () => {
  const [activeLists, setActiveLists] = useState('users')

  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar setActiveLists={setActiveLists} />
        {/* <UserProfileList activeLists={activeLists} /> */}
        {/* <UserProfile userId=/> */}
      </Flex>
    </Layout>
  )
}

export default index
