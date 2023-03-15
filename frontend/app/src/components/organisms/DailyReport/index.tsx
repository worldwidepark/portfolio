import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  deleteDailyReport,
  editDailyReport,
  getDailyReportsList,
  postDailyReport,
} from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'
import { getUserProfileData } from '../../../services/userprofile/userInfo'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DailyReportsList = () => {
  const Today = new Date()
  const [dailyReports, setDailyReports] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedId, setEditedId] = useState(false)
  const [inputData, setInputData] = useState({
    text: '',
    time: '',
    reportDateOn: Today.toLocaleDateString('ja-JP'),
  })

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
    if (editedId) {
      editInputRef.current.focus()
      console.log(editInputRef.current)
    }
  }, [editedId])

  // todo combined_time → usecontextを使う
  useEffect(() => {
    if (typeof userId == 'number') {
      getUserProfileData(userId).then((data) => {
        setCombinedTime(data.user.combinedTime)
      })
      console.log(dailyReports, 'dailyReportssssss')
    }
  }, [dailyReports])

  const getEditedDailyReport = () => {
    return dailyReports.find((dailyReport) => dailyReport.id === editedId)
  }
  const onChangeInputData = (key, value) => {
    setInputData({ ...inputData, [key]: value })
    console.log(inputData, 'inpuDataaaaaa')
  }

  const onChangeEditInput = (key, value) => {
    const editDailyReport = getEditedDailyReport()
    const onUpdateDailyreport = { ...editDailyReport, [key]: value }
    const updatedDailyReportArray = dailyReports.map((dailyReport) => {
      if (dailyReport.id === editedId) {
        return onUpdateDailyreport
      } else {
        return dailyReport
      }
    })
    setDailyReports(updatedDailyReportArray)
  }
  // todo fetch update.
  const onEditReport = (dailyReport) => {
    const editAndGet = async () => {
      await editDailyReport(userId, dailyReport)
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
    }
    setEditedId(false)
    editAndGet()
  }
  const sortedByDate = (data) =>
    data
      .slice()
      .sort((a, b) => new Date(b.reportDateOn) - new Date(a.reportDateOn))

  const handleSubmit = (event) => {
    event.preventDefault()
    postDailyReport(userId, inputData).then((dailyReportData) => {
      setDailyReports(sortedByDate([...dailyReports, dailyReportData]))
    })
    setInputData({
      text: '',
      time: '',
      reportDateOn: Today.toLocaleDateString('ja-JP'),
    })
  }
  // todo: fix
  const onDeleteReport = (reportId) => {
    const deleteAndGet = async () => {
      await deleteDailyReport(userId, reportId)
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
    }
    deleteAndGet()
  }
  // todo: useRefを使う
  const onEditReportInput = (reportId) => {
    setEditedId(reportId)
  }

  return (
    <>
      <div>総学習時間:</div>
      {combinedTime}
      <form onSubmit={handleSubmit}>
        <div>
          {/* todo: 初期focusを当てたい */}
          {/* todo: labelをつける */}
          <input
            type="text"
            name="text"
            value={inputData.text}
            onChange={(e) => onChangeInputData('text', e.target.value)}
            placeholder="日報を記入してください。"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="time"
            step="0.1"
            min="0"
            max="24"
            value={inputData.time}
            onChange={(e) => onChangeInputData('time', e.target.value)}
            placeholder="時間を記入してください。"
            required
          />
        </div>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          maxDate={Today}
          selected={new Date(inputData.reportDateOn)}
          required
          onChange={(selectedDate) => {
            onChangeInputData(
              'reportDateOn',
              selectedDate.toLocaleDateString('ja-JP')
            )
          }}
        />
        <button type="submit">登録</button>
      </form>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            {dailyReports.map((dailyReport) => (
              <div key={dailyReport.id}>
                {editedId === dailyReport.id ? (
                  <form onSubmit={() => onEditReport(dailyReport)}>
                    <input
                      type="text"
                      value={dailyReport.text}
                      ref={editInputRef}
                      onChange={(e) =>
                        onChangeEditInput('text', e.target.value)
                      }
                    />
                    <input
                      type="number"
                      name="time"
                      step="0.1"
                      min="0"
                      max="24"
                      onChange={(e) =>
                        onChangeEditInput('time', e.target.value)
                      }
                      placeholder="時間を記入してください。"
                      value={dailyReport.time}
                      required
                    />
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      maxDate={Today}
                      selected={new Date(dailyReport.reportDateOn)}
                      required
                      onChange={(selectedDate) => {
                        onChangeEditInput(
                          'reportDateOn',
                          selectedDate.toLocaleDateString('ja-JP')
                        )
                      }}
                    />
                    <button type="submit">edit</button>
                  </form>
                ) : (
                  <>
                    <div>{dailyReport.text}</div>
                    <div>{dailyReport.time}</div>
                    <div>{dailyReport.reportDateOn}</div>
                    <button onClick={() => onDeleteReport(dailyReport.id)}>
                      x
                    </button>
                    <button onClick={() => onEditReportInput(dailyReport.id)}>
                      edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </Flex>
    </>
  )
}
