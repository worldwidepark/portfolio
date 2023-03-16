import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const signup = async (data) => {
  return await axios
    .post(
      `${DEFAULT_API}/auth`,
      {
        email: data.get('email'),
        password: data.get('password'),
        password_confirm: data.get('password_confirm'),
      },
      { headers: { 'content-type': 'application/json' } }
    )
    .then(function (response) {
      return response.data.data.email
    })
}
