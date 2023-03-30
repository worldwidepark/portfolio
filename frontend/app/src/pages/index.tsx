import React, { useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import { Sidebar } from '../components/organisms/Sidebar'
import { Flex } from '../components/layout/Flex'
import { DailyReportInputForm } from '../components/organisms/DailyReport'
import { getUserProfileListData } from '../services/userProfile/userProfile'
import { UserProfileList } from '../components/organisms/UserProfile/profileList'
import { Box } from '../components/layout/Box'
import { getPresentationsList } from '../services/presentation/presentation'
import { PresentationsList } from '../components/organisms/Presentation/presentation'
import { PresentElements } from '../components/organisms/Presentation/presentElements'
import itemForUrl from '../components/molecules/UserProfile/itemForUrl'
const index = () => {
  const [activeLists, setActiveLists] = useState('users')
  const [userProfileListData, setUserProfileListData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showingDataUserId, setShowingDataUserId] = useState()
  const [dailyReports, setDailyReports] = useState([])
  const [achivements, setAchivements] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [programmingLanguageTags, setProgramminglanguageTags] = useState([])
  const [urlItem, setUrlItem] = useState()
  useEffect(() => {
    getUserProfileListData().then((listData) => {
      setUserProfileListData(listData)
      setLoading(false)
      console.log(listData, 'listdata')
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
          setUrlItem()
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
        <Sidebar />
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
                    userId={showingDataUserId}
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
