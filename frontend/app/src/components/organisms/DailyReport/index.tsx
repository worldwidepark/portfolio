import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  deleteDailyReport,
  editDailyReport,
  getDailyReportsList,
  postDailyReport,
} from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'

export const DailyReportsList = () => {
  const [dailyReports, setDailyReports] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedId, setEditedId] = useState(false)
  const [inputText, setInputText] = useState('')
  const [inputTime, setInputTime] = useState(0)
  const [wholeTime, setWholeTime] = useState(0)
  const { currentUserId } = useContext(AuthContext)
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
      })
      setLoading(false)
    }
  }, [userId])

  const onChangeInputText = (value) => {
    setInputText(value)
  }
  const onChangeInputTime = (value) => {
    setInputTime(value)
  }

  useEffect(() => {
    if (editedId) {
      editInputRef.current.focus()
      console.log(editInputRef.current)
    }
  }, [editedId])
  useEffect(() => {
    let wholeTimeCalc = 0
    dailyReports.map((dailyReport) => {
      wholeTimeCalc = wholeTimeCalc + dailyReport.time
    })
    setWholeTime(wholeTimeCalc)
  }, [dailyReports])
  const onChangeEditInput = (updatedDailyReportId) => {
    const updatedDailyReportArray = dailyReports.map((dailyReport) => {
      if (dailyReport.id === updatedDailyReportId) {
        dailyReport.text = editInputRef.current.value
        return dailyReport
      } else {
        return dailyReport
      }
    })
    setDailyReports(updatedDailyReportArray)
  }
  // todo fetch update.
  const onEditReport = (reportId) => {
    const editAndGet = async () => {
      await editDailyReport(userId, reportId, editInputRef.current.value)
      getDailyReportsList(userId).then((dailyReportsData) => {
        setDailyReports(dailyReportsData)
      })
    }
    setEditedId(false)
    editAndGet()
  }

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
    setInputText('')
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
      {wholeTime}
      <form onSubmit={handleSubmit}>
        <div>
          {/* todo: 初期focusを当てたい */}
          {/* todo: labelをつける */}
          <input
            type="text"
            name="text"
            value={inputText}
            onChange={(e) => onChangeInputText(e.target.value)}
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
            onChange={(e) => onChangeInputTime(e.target.value)}
            placeholder="時間を記入してください。"
            required
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
                {editedId === dailyReport.id ? (
                  <>
                    <input
                      type="text"
                      value={dailyReport.text}
                      ref={editInputRef}
                      onChange={() => onChangeEditInput(dailyReport.id)}
                    />
                    <button onClick={() => onEditReport(dailyReport.id)}>
                      edit
                    </button>
                  </>
                ) : (
                  <>
                    <div>{dailyReport.text}</div> <div>{dailyReport.time}</div>{' '}
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
