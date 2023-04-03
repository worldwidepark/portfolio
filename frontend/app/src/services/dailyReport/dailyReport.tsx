import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'
import { DailyReportType } from '../../types/types'

export const getDailyReportsList = async (userId: number) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}/daily_reports`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      console.log(response.data, 'response')
      return response.data
    })
}

export const postDailyReport = async (
  userId: number,
  data: { text: string; time: number | string },
  reportDateOn: Date
) => {
  return await axios
    .post(`${DEFAULT_API}/users/${userId}/daily_reports`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      daily_report: {
        text: data.text,
        time: data.time,
        report_date_on: reportDateOn,
      },
    })
    .then((response) => {
      return response.data
    })
}

export const deleteDailyReport = async (userId: number, reportId: number) => {
  return await axios.delete(
    `${DEFAULT_API}/users/${userId}/daily_reports/${reportId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    }
  )
}

export const editDailyReport = async (
  userId: number,
  data: DailyReportType,
  reportDateOn: Date
) => {
  return await axios
    .patch(`${DEFAULT_API}/users/${userId}/daily_reports/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      daily_report: {
        text: data.text,
        time: data.time,
        report_date_on: reportDateOn,
      },
    })
    .then((response) => {
      return response.data
    })
}
