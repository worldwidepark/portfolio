import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { signup } from '../../../services/auth/signup'
import { AuthContext } from '../../../contexts/AuthContext'

const SignupForm = () => {
  const router = useRouter()
  const { setAuthMessage } = useContext(AuthContext)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await signup(data)
    setAuthMessage(
      '会員登録が完了しました。ログインしてサービスを利用してください。'
    )
    router.push('/signin')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Emailを入力してください。"
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            placeholder="passwordを入力してください。"
          />
        </div>
        <div>
          <input
            type="text"
            name="password_confirmation"
            placeholder="passwordを入力してください。"
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </>
  )
}
export default SignupForm
