import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import uuid from 'react-uuid'

import {
  getDailyReportsList,
  postDailyReport,
} from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'

export const DailyReportsList = ({}) => {
  const [dailyReports, setDailyReports] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentUserId } = useContext(AuthContext)
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    postDailyReport(userId, data)
    getDailyReportsList(userId).then((dailyReportsData) => {
      setDailyReports(dailyReportsData)
    })
  }
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
              <div key={dailyReport.id}>{dailyReport.text}</div>
            ))}
          </>
        )}
      </Flex>
    </>
  )
}
