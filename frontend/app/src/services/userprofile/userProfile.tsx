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
      console.log(response.data, 'response')
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
        image: data.image,
        urls: data.urls,
      },
    })
    .then((response) => {
      return response.data
    })
}
