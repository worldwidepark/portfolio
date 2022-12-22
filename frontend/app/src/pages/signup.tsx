import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SignupForm from '../components/organisms/SignupForm'
import { AuthContext } from '../contexts/AuthContext'

const signup = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  if (isSignedIn) router.push('/')
  return (
    <>
      <SignupForm />
      <Link href="/signin">
        <button>Sign in</button>
      </Link>
    </>
  )
}
export default signup

// const signUpBox = () => {
//   const router = useRouter()
//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const data = new FormData(event.currentTarget)
//     const baseURL = `http://localhost:3001/api/v1/`
//     const axiosInstance = axios.create({
//       baseURL,
//       headers: {
//         'content-type': 'application/json',
//       },
//     })
//     ;(async () => {
//       return await axiosInstance
//         .post('auth', {
//           email: data.get('email'),
//           password: data.get('password'),
//           password_confirm: data.get('password_confirm'),
//         })
//         .then(function (response) {
//           console.log(response)
//           router.push('/')
//         })
//     })()
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="email"
//             placeholder="Emailを入力してください。"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="password"
//             placeholder="passwordを入力してください。"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="password_confirmation"
//             placeholder="passwordを入力してください。"
//           />
//         </div>
//         <button type="submit">sign up</button>
//       </form>
//       <Link href="/">
//         <button>TOP</button>
//       </Link>
//     </>
//   )
// }

// export default signUpBox
