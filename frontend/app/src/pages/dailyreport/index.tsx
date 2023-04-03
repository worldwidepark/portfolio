import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  deleteDailyReport,
  editDailyReport,
  getDailyReportsList,
  postDailyReport,
} from '../../services/dailyReport/dailyReport'
import { AuthContext } from '../../contexts/AuthContext'
import { getUserProfileData } from '../../services/userProfile/userProfile'
import { Flex } from '../../components/layout/Flex'
import { DailyReportsList } from '../../components/organisms/DailyReport'
import { Sidebar } from '../../components/organisms/Sidebar'
import Layout from '../../components/templates/Layout'
import { NextPage } from 'next/types'
import { DailyReportType } from '../../types/types'
import { type } from 'os'

const dailyReport: NextPage = () => {
  const Today: Date = new Date()
  const [dailyReports, setDailyReports] = useState<DailyReportType[]>([])
  const [userId, setUserId] = useState<number | boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [reportDateOn, setReportDateOn] = useState<Date>(Today)
  const [editReportDateOn, setEditReportDateOn] = useState<Date>(Today)
  const [inputData, setInputData] = useState<{
    text: string
    time: number | string
  }>({
    text: '',
    time: '',
  })
  const [editedDailyReport, setEditedDailyReport] = useState<DailyReportType>({
    id: NaN,
    reportDateOn: '',
    text: '',
    time: NaN,
  })
  const { currentUserId, combinedTime, setCombinedTime } =
    useContext(AuthContext)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof currentUserId === 'number') {
      setUserId(currentUserId)
    }
  }, [currentUserId])

  useEffect(() => {
    if (typeof userId == 'number') {
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [editedDailyReport.id])

  useEffect(() => {
    if (typeof userId == 'number') {
      getUserProfileData(userId).then((data) => {
        if (typeof data.combinedTime === 'number') {
          setCombinedTime(data.combinedTime)
        }
      })
    }
  }, [dailyReports])

  const onChangeInputData = (key: string, value: string | number) => {
    setInputData({ ...inputData, [key]: value })
  }

  const onChangeEditInput = (key: string, value: string | number) => {
    if (typeof editedDailyReport === 'object') {
      setEditedDailyReport({ ...editedDailyReport, [key]: value })
    }
  }
  const updatedDailyReports = (updatedDailyReport: DailyReportType) => {
    const updatedDailyReportArray = dailyReports.map((dailyReport) => {
      if (dailyReport.id === updatedDailyReport.id) {
        return updatedDailyReport
      } else {
        return dailyReport
      }
    })
    setDailyReports(sortedByDate(updatedDailyReportArray))
  }

  const onEditReport = (dailyReport: DailyReportType) => {
    if (typeof userId === 'number') {
      editDailyReport(userId, dailyReport, editReportDateOn).then(
        (dailyReportsData) => {
          updatedDailyReports(dailyReportsData)
        }
      )
      setEditedDailyReport({ id: NaN, reportDateOn: '', text: '', time: NaN })
    }
  }

  const sortedByDate = (data: DailyReportType[]) =>
    data
      .slice()
      .sort(
        (a: DailyReportType, b: DailyReportType) =>
          new Date(b.reportDateOn).getTime() -
          new Date(a.reportDateOn).getTime()
      )

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (typeof userId === 'number') {
      postDailyReport(userId, inputData, reportDateOn).then(
        (dailyReportData) => {
          setDailyReports(sortedByDate([...dailyReports, dailyReportData]))
        }
      )

      setInputData({
        text: '',
        time: '',
      })
    }
  }
  const onDeleteReport = (reportId: number) => {
    const deleteAndGet = async () => {
      if (typeof userId === 'number') {
        await deleteDailyReport(userId, reportId)
        getDailyReportsList(userId).then((dailyReportsData) => {
          setDailyReports(dailyReportsData)
        })
      }
    }
    deleteAndGet()
  }
  const onEditReportInput = (dailyReport: DailyReportType) => {
    setEditedDailyReport(dailyReport)
    setEditReportDateOn(new Date(dailyReport.reportDateOn))
  }

  const onChangeReportDateOn = (selectedDate: Date | null) => {
    if (selectedDate instanceof Date) {
      setReportDateOn(selectedDate)
    }
  }
  const onChangeEditReportDateOn = (selectedDate: Date | null) => {
    if (selectedDate instanceof Date) {
      setEditReportDateOn(selectedDate)
    }
  }

  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <DailyReportsList
            combinedTime={combinedTime}
            dailyReports={dailyReports}
            editInputRef={editInputRef}
            editedDailyReport={editedDailyReport}
            editReportDateOn={editReportDateOn}
            handleSubmit={handleSubmit}
            inputData={inputData}
            onChangeEditInput={onChangeEditInput}
            onChangeInputData={onChangeInputData}
            onDeleteReport={onDeleteReport}
            onEditReport={onEditReport}
            onEditReportInput={onEditReportInput}
            reportDateOn={reportDateOn}
            onChangeEditReportDateOn={onChangeEditReportDateOn}
            onChangeReportDateOn={onChangeReportDateOn}
            Today={Today}
          />
        )}
      </Flex>
    </Layout>
  )
}

export default dailyReport
