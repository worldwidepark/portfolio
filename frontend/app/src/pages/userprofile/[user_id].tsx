import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import {
  editUserProfileData,
  getUserProfileData,
} from '../../services/userprofile/userProfile'

const userProfile = () => {
  const router = useRouter()
  const { user_id } = router.query
  const [userProfileData, setUserProfileData] = useState({})
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(true)
  const [editedUserProfileData, setEditedUserProfileData] = useState({})
  const [onEditUserProfile, setOnEditUserProfile] = useState(false)
  const { currentUserId } = useContext(AuthContext)

  useEffect(() => {
    if (router.isReady) {
      setUserId(Number(user_id))
      setLoading(false)
    }
  }, [user_id])

  useEffect(() => {
    if (typeof userId === 'number')
      getUserProfileData(userId).then((userProfileData) => {
        setUserProfileData(userProfileData)
      })
  }, [userId])

  const onChangeUserProfileData = (key, value) => {
    setEditedUserProfileData({ ...editedUserProfileData, [key]: value })
  }

  const onClickEdit = () => {
    setOnEditUserProfile(true)
    setEditedUserProfileData(userProfileData)
  }

  const onSubmitUserProfile = (event) => {
    event.preventDefault()
    editUserProfileData(currentUserId, editedUserProfileData).then(
      (userProfileData) => {
        setUserProfileData(userProfileData)
        setOnEditUserProfile(false)
      }
    )
  }

  return (
    <>
      {loading ? (
        <h1>ロード中。。</h1>
      ) : (
        <>
          {onEditUserProfile ? (
            <>
              <form onSubmit={onSubmitUserProfile}>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    onChangeUserProfileData('name', e.target.value)
                  }
                  value={editedUserProfileData.name}
                />
                <textarea
                  name="introduce"
                  onChange={(e) =>
                    onChangeUserProfileData('introduce', e.target.value)
                  }
                  value={editedUserProfileData.introduce}
                ></textarea>
                <input
                  type="text"
                  name="occupation"
                  onChange={(e) =>
                    onChangeUserProfileData('occupation', e.target.value)
                  }
                  value={editedUserProfileData.occupation}
                />
                <button type="submit">編集</button>
              </form>
            </>
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
              {currentUserId == userId && (
                <button onClick={() => onClickEdit()}>edit</button>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default userProfile
