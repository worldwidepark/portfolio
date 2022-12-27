import { fetcher } from '../../utlis'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { DEFAULT_API } from '../../urls'
// 練習のためfetchでも実装を行なった。
export const signout = () => {
  fetch(`${DEFAULT_API}/auth/sign_out`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      uid: Cookies.get('uid'),
      client: Cookies.get('client'),
      'access-token': Cookies.get('access-token'),
    },
  })
    // cookie clear 必要
    .then((response) => response.json())
}
