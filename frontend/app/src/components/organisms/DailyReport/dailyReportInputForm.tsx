import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { postDailyReport } from '../../../services/dailyReport/dailyReport'
import { AuthContext } from '../../../contexts/AuthContext'

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
        <button type="submit">登録</button>
      </form>
    </>
  )
}
