import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'
import { AchivementType } from '../../types/types'

export const getAchivementsList = async (userId: number) => {
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
  userId: number,
  data: FormData,
  urls: string[] | undefined,
  startDate: Date,
  endDate: Date
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

export const deleteAchivement = async (userId: number, reportId: number) => {
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

export const editAchivement = async (
  userId: number,
  data: AchivementType,
  urls: string[] | undefined,
  startDate: Date,
  endDate: Date
) => {
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
        urls: urls,
        start_date_on: startDate,
        end_date_on: endDate,
      },
    })
    .then((response) => {
      return response.data
    })
}
