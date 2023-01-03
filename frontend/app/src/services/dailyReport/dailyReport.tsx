import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getDailyReportsList = async (userId) => {
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

export const postDailyReport = async (userId, data) => {
  return await axios
    .post(`${DEFAULT_API}/users/${userId}/daily_reports`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      daily_report: { text: data.get('text') },
    })
    .then((response) => {
      console.log(response, 'response')
    })
}