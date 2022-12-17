import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

const signInBox = () => {
  const router = useRouter()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const baseURL = `http://localhost:3001/api/v1/`
    const axiosInstance = axios.create({
      baseURL,
      headers: {
        'content-type': 'application/json',
      },
    })
    ;(async () => {
      return await axiosInstance
        .post('users/20/work_experiences', {
          job_title: data.get('job_title'),
          duties: data.get('duties'),
        })
        .then(function (response) {
          console.log(response)
        })
    })()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="job_title" placeholder="job_title" />
        </div>
        <div>
          <input
            type="text"
            name="duties"
            placeholder="仕事の詳細を教えてください。"
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <Link href="/">
        <button>TOP</button>
      </Link>
    </>
  )
}
export default signInBox
