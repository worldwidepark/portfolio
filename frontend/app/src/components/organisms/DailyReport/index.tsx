import React, { useContext, useEffect, useState } from 'react'

import {
  deleteDailyReport,
  getDailyReportsList,
  postDailyReport,
} from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'

export const DailyReportsList = () => {
  const [dailyReports, setDailyReports] = useState([])
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
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
      setLoading(false)
    }
  }, [userId])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const postAndGet = async () => {
      await postDailyReport(userId, data)
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
    }
    postAndGet()
  }
  const onDeleteReport = (reportId) => {
    const deleteAndGet = async () => {
      await deleteDailyReport(userId, reportId)
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
    }
    deleteAndGet()
  }
  // useRef
  const onEditReportInput = (reportId) => {
    console.log(dailyReports)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="text"
            placeholder="日報を記入してください。"
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            {dailyReports.map((dailyReport) => (
              <div key={dailyReport.id}>
                <div>{dailyReport.text}</div>
                <button onClick={() => onDeleteReport(dailyReport.id)}>
                  x
                </button>
                <button onClick={() => onEditReportInput(dailyReport.id)}>
                  edit
                </button>
              </div>
            ))}
          </>
        )}
      </Flex>
    </>
  )
}
