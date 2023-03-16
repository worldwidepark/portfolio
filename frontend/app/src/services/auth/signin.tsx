import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const signin = async (data) => {
  return await axios
    .post(
      `${DEFAULT_API}/auth/sign_in`,
      {
        email: data.get('email'),
        password: data.get('password'),
      },
      { headers: { 'content-type': 'application/json' } }
    )
    .then(function (response) {
      Cookies.set('uid', response.headers['uid'])
      Cookies.set('client', response.headers['client'])
      Cookies.set('access-token', response.headers['access-token'])
    })
}
