import { GetServerSideProps } from 'next'
import Cookies from 'js-cookie'

export const signOutServerSideProps = (url) => {
  fetch(`http://localhost:3001/api/v1/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      uid: Cookies.get('uid'),
      client: Cookies.get('client'),
      'access-token': Cookies.get('access-token'),
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
}
