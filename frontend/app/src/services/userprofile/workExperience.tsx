import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getWorkExperience = async (userId) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}/work_experiences`, {
      headers: {
        'Content-Type': 'application/json',
        // uid: Cookies.get('uid'),
        // client: Cookies.get('client'),
        // 'access-token': Cookies.get('access-token'),
      },
    })
    .then((response) => {
      return response.data
    })
}
