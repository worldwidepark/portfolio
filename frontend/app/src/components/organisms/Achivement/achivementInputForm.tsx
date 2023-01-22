import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { postAchivement } from '../../../services/achivement/achivement'
import { AuthContext } from '../../../contexts/AuthContext'

export const AchivementInputForm = () => {
  const { currentUserId } = useContext(AuthContext)
  const handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    postAchivement(currentUserId, data)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="題名を記入してください。"
          />
          <input
            type="text"
            name="text"
            placeholder="内容を記入してください。"
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </>
  )
}
