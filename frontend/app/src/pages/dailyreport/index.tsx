import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  deleteDailyReport,
  editDailyReport,
  getDailyReportsList,
  postDailyReport,
} from '../../services/dailyReport/dailyReport'
import { AuthContext } from '../../contexts/AuthContext'
import { getUserProfileData } from '../../services/userprofile/userInfo'
import { Flex } from '../../components/layout/Flex'
import { DailyReportsList } from '../../components/organisms/DailyReport'
import { Sidebar } from '../../components/organisms/Sidebar'
import Layout from '../../components/templates/Layout'

const dailyReport = () => {
  const Today = new Date()
  const [dailyReports, setDailyReports] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reportDateOn, setReportDateOn] = useState(Today)
  const [editReportDateOn, setEditReportDateOn] = useState(Today)
  const [inputData, setInputData] = useState({
    text: '',
    time: '',
  })
  const [editedDailyReport, setEditedDailyReport] = useState(false)
  const { currentUserId, combinedTime, setCombinedTime } =
    useContext(AuthContext)
  const editInputRef = useRef(null)

  useEffect(() => {
    setUserId(currentUserId)
    console.log(currentUserId, 'current')
  }, [currentUserId])

  useEffect(() => {
    console.log(typeof userId, 'userId')
    if (typeof userId == 'number') {
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
        console.log(dailyReportsData)
      })
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (editedDailyReport) {
      editInputRef.current.focus()
      console.log(editInputRef.current)
    }
  }, [editedDailyReport.id])

  useEffect(() => {
    if (typeof userId == 'number') {
      getUserProfileData(userId).then((data) => {
        setCombinedTime(data.user.combinedTime)
      })
    }
  }, [dailyReports])

  const onChangeInputData = (key, value) => {
    setInputData({ ...inputData, [key]: value })
  }

  const onChangeEditInput = (key, value) => {
    setEditedDailyReport({ ...editedDailyReport, [key]: value })
  }
  const updatedDailyReports = (updatedDailyReport) => {
    const updatedDailyReportArray = dailyReports.map((dailyReport) => {
      if (dailyReport.id === updatedDailyReport.id) {
        return updatedDailyReport
      } else {
        return dailyReport
      }
    })
    setDailyReports(sortedByDate(updatedDailyReportArray))
  }

  const onEditReport = (dailyReport) => {
    editDailyReport(userId, dailyReport, editReportDateOn).then(
      (dailyReportsData) => {
        updatedDailyReports(dailyReportsData)
      }
    )
    setEditedDailyReport(false)
  }

  const sortedByDate = (data) =>
    data
      .slice()
      .sort((a, b) => new Date(b.reportDateOn) - new Date(a.reportDateOn))

  const handleSubmit = (event) => {
    event.preventDefault()
    postDailyReport(userId, inputData, reportDateOn).then((dailyReportData) => {
      setDailyReports(sortedByDate([...dailyReports, dailyReportData]))
    })
    setInputData({
      text: '',
      time: '',
    })
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
  const onEditReportInput = (dailyReport) => {
    setEditedDailyReport(dailyReport)
    setEditReportDateOn(new Date(dailyReport.reportDateOn))
  }

  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        <DailyReportsList
          combinedTime={combinedTime}
          dailyReports={dailyReports}
          editInputRef={editInputRef}
          editedDailyReport={editedDailyReport}
          editReportDateOn={editReportDateOn}
          handleSubmit={handleSubmit}
          inputData={inputData}
          loading={loading}
          onChangeEditInput={onChangeEditInput}
          onChangeInputData={onChangeInputData}
          onDeleteReport={onDeleteReport}
          onEditReport={onEditReport}
          onEditReportInput={onEditReportInput}
          reportDateOn={reportDateOn}
          setEditReportDateOn={setEditReportDateOn}
          setReportDateOn={setReportDateOn}
          Today={Today}
        />
      </Flex>
    </Layout>
  )
}

export default dailyReport
