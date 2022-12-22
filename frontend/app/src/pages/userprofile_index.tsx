import React, { use, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import index from '.'

const signInBox = () => {
  const [data, setData] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const baseURL = `http://localhost:3001/api/v1/`
    const axiosInstance = axios.create({
      baseURL,
      headers: {
        'content-type': 'application/json',
      },
    })
    ;(async () => {
      return await axiosInstance
        .get('users/20/work_experiences')
        .then((response) => {
          console.log(response.data)
          setData(response.data)
        })
    })()
  }
  return (
    <>
      <button onClick={handleSubmit}>a</button>
      {data.map((item, index) => (
        <div>{item.job_title}</div>
      ))}
    </>
  )
}
export default signInBox
