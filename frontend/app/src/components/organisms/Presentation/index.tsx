import React, { useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { getPresentationsList } from '../../../services/presentation/presentation'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { PresentElement } from './presentElement'

export const PresentationsList = () => {
  const [dailyReports, setDailyReports] = useState([])
  const [achivements, setAchivements] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentUserId } = useContext(AuthContext)

  useEffect(() => {
    setUserId(currentUserId)
    console.log(currentUserId, 'current')
  }, [currentUserId])

  useEffect(() => {
    console.log(typeof userId, 'userId')
    if (typeof userId == 'number') {
      getPresentationsList(userId).then((presentationElementDatas) => {
        setDailyReports(presentationElementDatas.dailyReports)
        setAchivements(presentationElementDatas.achivements)
      })
      setLoading(false)
    }
  }, [userId])

  const onChangeEditPresent = (key, value) => {
    const editAchivement = getEditedAchivement()
    const onUpdateAchivement = { ...editAchivement, [key]: value }
    const updatedAchivementArray = achivements.map((achivement) => {
      if (achivement.id === onUpdateAchivement.id) {
        return onUpdateAchivement
      } else {
        return achivement
      }
    })
    setAchivements(updatedAchivementArray)
  }
  return (
    <>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            <Box width="100vh" backgroundColor="green">
              {achivements.map((element) => (
                <>
                  <PresentElement
                    userId={currentUserId}
                    element={element}
                    elementName={'achivement'}
                  />
                </>
              ))}
            </Box>
            <Box width="100vh" backgroundColor="blue">
              {dailyReports.map((element) => (
                <>
                  <PresentElement
                    userId={currentUserId}
                    element={element}
                    elementName={'dailyReport'}
                  />
                </>
              ))}
            </Box>
          </>
        )}
      </Flex>
    </>
  )
}
