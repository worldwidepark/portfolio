import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getUserProfileListData = async () => {
  return await axios
    .get(`${DEFAULT_API}/users`, {
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

export const getUserProfileData = async (userId) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}`, {
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
export const editUserProfileImage = async (userId, image) => {
  const formData = new FormData()
  formData.append('user[image]', image)

  return await axios
    .patch(`${DEFAULT_API}/users/${userId}`, formData, {
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
export const editUserProfileData = async (userId, data) => {
  return await axios
    .patch(`${DEFAULT_API}/users/${userId}`, {
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

export const searchUserProfileData = async (name) => {
  return await axios
    .post(`${DEFAULT_API}/users/search`, {
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
