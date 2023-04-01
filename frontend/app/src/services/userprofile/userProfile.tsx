import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'
import { UserProfileType } from '../../types/types'

export const getUserProfileListData = async () => {
  return await axios
    .get<UserProfileType[]>(`${DEFAULT_API}/users`, {
      // todo: headers lessにしたい
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

export const getUserProfileData = async (userId: number) => {
  return await axios
    .get<UserProfileType>(`${DEFAULT_API}/users/${userId}`, {
      headers: {
        // todo: headers lessにしたい
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
export const editUserProfileImage = async (userId: number, image: string) => {
  const formData = new FormData()
  formData.append('user[image]', image)

  return await axios
    .patch<UserProfileType>(`${DEFAULT_API}/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      return response.data
    })
}
export const editUserProfileData = async (
  userId: number,
  data: { name: string; introduce: string; occupation: string; url: string[] }
) => {
  return await axios
    .patch<UserProfileType>(`${DEFAULT_API}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      user: {
        name: data.name,
        introduce: data.introduce,
        occupation: data.occupation,
        url: data.url,
      },
    })
    .then((response) => {
      return response.data
    })
}

export const searchUserProfileData = async (name: string) => {
  return await axios
    .post<UserProfileType[]>(`${DEFAULT_API}/users/search`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      user: {
        programming_language_name: name,
      },
    })
    .then((response) => {
      return response.data
    })
}
