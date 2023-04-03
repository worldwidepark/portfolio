import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getPresentationsList = async (userId: number) => {
  return await axios
    .get(`${DEFAULT_API}/users/${userId}/presentations`, {
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

export const closedPresentation = async (
  userId: number,
  presentationId: number,
  presentState: boolean
) => {
  return await axios
    .patch(`${DEFAULT_API}/users/${userId}/presentations/${presentationId}`, {
      headers: {
        'Content-Type': 'application/json',
        uid: Cookies.get('uid'),
        client: Cookies.get('client'),
        'access-token': Cookies.get('access-token'),
      },
      presentation: { present: presentState },
    })
    .then((response) => {
      console.log(response, 'response')
    })
}
