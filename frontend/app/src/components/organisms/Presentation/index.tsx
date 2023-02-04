import React, { useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { getPresentationsList } from '../../../services/presentation/presentation'
import { Flex } from '../../layout/Flex'

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

  return (
    <>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            {achivements.map((element) => (
              <>
                <div key={element.id}></div>
                <div>{element.title}</div>
                <div>{element.text}</div>
              </>
            ))}
            {dailyReports.map((element) => (
              <>
                <div key={element.id}></div>
                <div>{element.text}</div>
              </>
            ))}
          </>
        )}
      </Flex>
    </>
  )
}
