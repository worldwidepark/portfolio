import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getProgrammingLanguagesData = async (userId: number) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}/programming_languages`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      return response.data
    })
}

export const postProgrammingLanguageData = async (
  userId: number,
  data: string
) => {
  return await axios
    .post(`${DEFAULT_API}/users/${userId}/programming_languages`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      programming_language: {
        name: data,
      },
    })
    .then((response) => {
      return response.data
    })
}

export const deleteProgrammingLanguageData = async (
  userId: number,
  tagId: number
) => {
  return await axios.delete(
    `${DEFAULT_API}/users/${userId}/programming_languages/${tagId}`,
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

export const searchProgrammingLanguagesData = async (
  userId: number,
  data: string
) => {
  return await axios
    .post(`${DEFAULT_API}/users/${userId}/programming_languages/search`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      programming_language: {
        name: data,
      },
    })
    .then((response) => {
      return response.data
    })
}
