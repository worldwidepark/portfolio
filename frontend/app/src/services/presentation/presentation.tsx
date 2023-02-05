import axios from 'axios'
import Cookies from 'js-cookie'
import { DEFAULT_API } from '../../urls'

export const getPresentationsList = async (userId) => {
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

// export const postAchivement = async (userId, data, urls) => {
//   return await axios
//     .post(`${DEFAULT_API}/users/${userId}/achivements`, {
//       headers: {
//         'Content-Type': 'application/json',
//         uid: Cookies.get('uid'),
//         client: Cookies.get('client'),
//         'access-token': Cookies.get('access-token'),
//       },
//       achivement: {
//         title: data.get('title'),
//         text: data.get('text'),
//         urls: urls,
//       },
//     })
//     .then((response) => {
//       console.log(response, 'response')
//     })
// }

// export const deleteAchivement = async (userId, reportId) => {
//   return await axios.delete(
//     `${DEFAULT_API}/users/${userId}/achivements/${reportId}`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         uid: Cookies.get('uid'),
//         client: Cookies.get('client'),
//         'access-token': Cookies.get('access-token'),
//       },
//     }
//   )
// }

export const closedPresentation = async (
  userId,
  presentationId,
  presentState
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
