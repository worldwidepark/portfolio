import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Text } from '../../components/atoms/Text'
import { Box } from '../../components/layout/Box'
import { Flex } from '../../components/layout/Flex'
import { AchivementsList } from '../../components/organisms/Achivement'
import { DailyReportsList } from '../../components/organisms/DailyReport'
import { DailyReportInputForm } from '../../components/organisms/DailyReport/dailyReportInputForm'
import Sidebar from '../../components/organisms/Sidebar/ index'
import Layout from '../../components/templates/Layout'
import { AuthContext } from '../../contexts/AuthContext'
import { getUserProfileData } from '../../services/userprofile/userInfo'
// todo: idの渡し方。
const mystudy = () => {
  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        {/* todo データがない時の対応 */}
        <AchivementsList />
      </Flex>
    </Layout>
  )
}

export default mystudy
