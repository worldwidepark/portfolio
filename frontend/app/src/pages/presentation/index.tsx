import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Flex } from '../../components/layout/Flex'
import { PresentationsList } from '../../components/organisms/Presentation/presentation'
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
// todo: idの渡し方。
const presentation = () => {
  const [dailyReports, setDailyReports] = useState([])
  const [dailyReportsPresent, setDailyReportsPresent] = useState([])
  const [achivements, setAchivements] = useState([])
  const [achivementsPresent, setAchivementsPresent] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentUserId } = useContext(AuthContext)

  useEffect(() => {
    setUserId(currentUserId)
    console.log(currentUserId, 'current')
  }, [currentUserId])

  useEffect(() => {
    if (typeof userId === 'number') {
      getPresentationsList(userId).then((presentationElementDatas) => {
        setDailyReports(presentationElementDatas.dailyReports)
        setAchivements(presentationElementDatas.achivements)
      })
      setLoading(false)
    }
  }, [userId])

  const reversePresent = (present) => {
    return !present
  }

  const chageAchivementPresent = (element) => {
    const updatedAchivements = achivements.map((achivement) => {
      if (achivement.id === element.id) {
        return {
          ...achivement,
          present: reversePresent(element.present),
        }
      }
      return achivement
    })

    setAchivements(updatedAchivements)
  }

  const chageDailyReportPresent = (element) => {
    const updatedDailyReports = dailyReports.map((dailyReport) => {
      if (dailyReport.id === element.id) {
        return {
          ...dailyReport,
          present: reversePresent(element.present),
        }
      }
      return dailyReport
    })

    setDailyReports(updatedDailyReports)
  }

  const onChangePresentState = (element, elementName) => {
    closedPresentation(userId, element.id, reversePresent(element.present))
    elementName === 'achivement'
      ? chageAchivementPresent(element)
      : chageDailyReportPresent(element)
  }
  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        <MakePresentationsList
          dailyReports={dailyReports}
          achivements={achivements}
          loading={loading}
          userId={userId}
          MakePresentElements={MakePresentElements}
          dailyReportsPresent={dailyReportsPresent}
          setDailyReportsPresent={setDailyReportsPresent}
          achivementsPresent={achivementsPresent}
          setAchivementsPresent={setAchivementsPresent}
          onChangePresentState={onChangePresentState}
        />
        <PresentationsList
          dailyReports={dailyReports}
          achivements={achivements}
          loading={loading}
          userId={userId}
          PresentElements={PresentElements}
          dailyReportsPresent={dailyReportsPresent}
          setDailyReportsPresent={setDailyReportsPresent}
          achivementsPresent={achivementsPresent}
          setAchivementsPresent={setAchivementsPresent}
        />
      </Flex>
    </Layout>
  )
}

export default presentation
