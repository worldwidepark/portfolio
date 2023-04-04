import React, { ReactNode, useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import { Flex } from '../components/layout/Flex'
import { getUserProfileListData } from '../services/userProfile/userProfile'
import { UserProfileList } from '../components/organisms/UserProfile/profileList'
import { Box } from '../components/layout/Box'
import { getPresentationsList } from '../services/presentation/presentation'
import { PresentationsList } from '../components/organisms/Presentation/presentationList'
import { PresentElements } from '../components/organisms/Presentation/presentElements'
import itemForUrl from '../components/molecules/UserProfile/itemForUrl'
import {
  AchivementType,
  DailyReportType,
  UserProfileTagsType,
  UserProfileType,
} from '../types/types'
import { NextPage } from 'next/types'

const index: NextPage = () => {
  const [userProfileListData, setUserProfileListData] = useState<
    UserProfileType[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showingDataUserId, setShowingDataUserId] = useState<number>()
  const [dailyReports, setDailyReports] = useState<DailyReportType[]>([])
  const [achivements, setAchivements] = useState<AchivementType[]>([])
  const [userInfo, setUserInfo] = useState<UserProfileType>({
    id: NaN,
    name: '',
  })
  const [programmingLanguageTags, setProgramminglanguageTags] = useState<
    UserProfileTagsType[]
  >([])
  const [urlItem, setUrlItem] = useState<ReactNode>()

  useEffect(() => {
    getUserProfileListData().then((listData) => {
      setUserProfileListData(listData)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (typeof showingDataUserId === 'number') {
      getPresentationsList(showingDataUserId).then(
        (presentationElementDatas) => {
          setDailyReports(presentationElementDatas.dailyReports)
          setAchivements(presentationElementDatas.achivements)
          setUserInfo(presentationElementDatas.userInfo)
          setProgramminglanguageTags(
            presentationElementDatas.programmingLanguageTags
          )
          setUrlItem(<></>)
        }
      )
    }
  }, [showingDataUserId])

  useEffect(() => {
    if (userInfo.url) {
      if (userInfo.url.url === '') {
        return setUrlItem('')
      }
      setUrlItem(itemForUrl(userInfo.url))
    }
  }, [userInfo])

  const onClickList = (userId) => {
    setShowingDataUserId(userId)
  }

  return (
    <Layout>
      <Flex flexDirection="row">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            <UserProfileList
              userProfileListData={userProfileListData}
              onClickList={onClickList}
            />
            <Flex flexDirection="column">
              <Box>
                {typeof showingDataUserId === 'number' ? (
                  <PresentationsList
                    dailyReports={dailyReports}
                    achivements={achivements}
                    PresentElements={PresentElements}
                    userInfo={userInfo}
                    urlItem={urlItem}
                    programmingLanguageTags={programmingLanguageTags}
                  />
                ) : (
                  <div>選択してください。</div>
                )}
              </Box>
            </Flex>
          </>
        )}

        {/* <UserProfile userId=/> */}
      </Flex>
    </Layout>
  )
}

export default index
