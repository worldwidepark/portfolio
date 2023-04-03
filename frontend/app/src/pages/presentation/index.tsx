import React, { ReactNode, useContext, useEffect } from 'react'
import { useState } from 'react'
import { Flex } from '../../components/layout/Flex'
import { PresentationsList } from '../../components/organisms/Presentation/presentationList'
import { MakePresentationsList } from '../../components/organisms/Presentation/makePresentationsList'
import { MakePresentElements } from '../../components/organisms/Presentation/makePresentElements'
import { PresentElements } from '../../components/organisms/Presentation/presentElements'
import { Sidebar } from '../../components/organisms/Sidebar'
import Layout from '../../components/templates/Layout'
import { AuthContext } from '../../contexts/AuthContext'
import {
  closedPresentation,
  getPresentationsList,
} from '../../services/presentation/presentation'
import itemForUrl from '../../components/molecules/UserProfile/itemForUrl'
import {
  AchivementType,
  DailyReportType,
  UserProfileTagsType,
  UserProfileType,
} from '../../types/types'
import { NextPage } from 'next/types'

const presentation: NextPage = () => {
  const [dailyReports, setDailyReports] = useState<DailyReportType[]>([])
  const [achivements, setAchivements] = useState<AchivementType[]>([])
  const [userId, setUserId] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const { currentUserId } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState<UserProfileType>({
    id: NaN,
    name: '',
  })
  const [programmingLanguageTags, setProgramminglanguageTags] = useState<
    UserProfileTagsType[]
  >([])
  const [urlItem, setUrlItem] = useState<ReactNode>()

  useEffect(() => {
    if (typeof currentUserId === 'number') {
      setUserId(currentUserId)
    }
  }, [currentUserId])

  useEffect(() => {
    if (typeof userId === 'number') {
      getPresentationsList(userId).then((presentationElementDatas) => {
        setDailyReports(presentationElementDatas.dailyReports)
        setAchivements(presentationElementDatas.achivements)
        setUserInfo(presentationElementDatas.userInfo)
        setProgramminglanguageTags(
          presentationElementDatas.programmingLanguageTags
        )
      })
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userInfo?.url) {
      if (userInfo.url.url === '') {
        return setUrlItem(<></>)
      }
      setUrlItem(itemForUrl(userInfo.url))
    }
  }, [userInfo])

  const reversePresent = (present: boolean) => {
    return !present
  }

  const chageAchivementPresent = (element: AchivementType) => {
    const updatedAchivements = achivements.map((achivement) => {
      if (
        achivement.id === element.id &&
        typeof element.present === 'boolean'
      ) {
        return {
          ...achivement,
          present: reversePresent(element.present),
        }
      }
      return achivement
    })

    setAchivements(updatedAchivements)
  }

  const chageDailyReportPresent = (element: DailyReportType) => {
    const updatedDailyReports = dailyReports.map((dailyReport) => {
      if (dailyReport.id === element.id && element.present) {
        return {
          ...dailyReport,
          present: reversePresent(element.present),
        }
      }
      return dailyReport
    })

    setDailyReports(updatedDailyReports)
  }

  const onChangePresentState = (element: any, elementName: string) => {
    if (typeof userId === 'number') {
      closedPresentation(userId, element.id, reversePresent(element.present))
      elementName === 'achivement'
        ? chageAchivementPresent(element)
        : chageDailyReportPresent(element)
    }
  }
  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            <MakePresentationsList
              dailyReports={dailyReports}
              achivements={achivements}
              userInfo={userInfo}
              MakePresentElements={MakePresentElements}
              onChangePresentState={onChangePresentState}
            />
            <PresentationsList
              dailyReports={dailyReports}
              achivements={achivements}
              PresentElements={PresentElements}
              userInfo={userInfo}
              urlItem={urlItem}
              programmingLanguageTags={programmingLanguageTags}
            />
          </>
        )}
      </Flex>
    </Layout>
  )
}

export default presentation
