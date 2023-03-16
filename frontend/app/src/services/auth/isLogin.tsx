import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getCurrentUser = async () => {
  return await axios.get(`${DEFAULT_API}/auth/sessions`, {
    headers: {
      'Content-Type': 'application/json',
      uid: Cookies.get('uid'),
      client: Cookies.get('client'),
      'access-token': Cookies.get('access-token'),
    },
  })
}
