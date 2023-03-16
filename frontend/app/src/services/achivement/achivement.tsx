import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getAchivementsList = async (userId) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}/achivements`, {
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

export const postAchivement = async (
  userId,
  data,
  urls,
  startDate,
  endDate
) => {
  return await axios
    .post(`${DEFAULT_API}/users/${userId}/achivements`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      achivement: {
        title: data.get('title'),
        text: data.get('text'),
        urls: urls,
        start_date_on: startDate,
        end_date_on: endDate,
      },
    })
    .then((response) => {
      return response.data
    })
}

export const deleteAchivement = async (userId, reportId) => {
  return await axios.delete(
    `${DEFAULT_API}/users/${userId}/achivements/${reportId}`,
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

export const editAchivement = async (userId, data, startDate, endDate) => {
  return await axios
    .patch(`${DEFAULT_API}/users/${userId}/achivements/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      achivement: {
        title: data.title,
        text: data.text,
        urls: data.urls,
        start_date_on: startDate,
        end_date_on: endDate,
      },
    })
    .then((response) => {
      return response.data
    })
}
