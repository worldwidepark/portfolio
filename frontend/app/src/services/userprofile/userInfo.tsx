import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getUserProfileListData = async () => {
  return await axios
    .get(`${DEFAULT_API}/users`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      console.log(response.data.data, 'response')
      return response.data.data
    })
}

export const getUserProfileData = async (userId) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      console.log(response.data.data, 'response')
      return response.data.data
    })
}
