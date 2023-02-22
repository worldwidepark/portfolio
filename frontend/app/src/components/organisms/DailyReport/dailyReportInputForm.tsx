import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { postDailyReport } from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'
// todo: コードを分離する。
export const DailyReportInputForm = () => {
  const { currentUserId } = useContext(AuthContext)
  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    postDailyReport(currentUserId, data)
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
        <div>
          <input
            type="number"
            name="time"
            step="0.1"
            min="0"
            max="24"
            placeholder="時間を記入してください。"
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </>
  )
}
