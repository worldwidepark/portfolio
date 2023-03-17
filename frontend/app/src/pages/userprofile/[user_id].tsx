import { url } from 'inspector'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getUserProfileData } from '../../services/userprofile/userProfile'

const userProfile = () => {
  const router = useRouter()
  const { user_id } = router.query
  const [userProfileData, setUserProfileData] = useState({})
  const [userId, setUserId] = useState(user_id)
  const [loading, setLoading] = useState(true)
  const [editedUserProfileData, setEditedUserProfileData] = useState(false)
  const { currentUserId } = useContext(AuthContext)

  useEffect(() => {
    console.log({ user_id }, 'vvvvvvvv')
    if (router.isReady) {
      getUserProfileData(user_id).then((userProfileData) => {
        setUserProfileData(userProfileData)
      })
      setLoading(false)
    }
  }, [user_id])

  return (
    <>
      {loading ? (
        <h1>ロード中。。</h1>
      ) : (
        <>
          <div>{userProfileData.name}</div>
          <div>{userProfileData.introduce}</div>
          <div>{userProfileData.occupation}</div>
          {/* <div>
            {userProfileData.urls.map((url) => (
              <div>{url}</div>
            ))}
          </div> */}
        </>
      )}
    </>
  )
}

export default userProfile
