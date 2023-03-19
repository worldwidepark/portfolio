import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Flex } from '../../components/layout/Flex'
import { Sidebar } from '../../components/organisms/Sidebar'
import { UserProfile } from '../../components/organisms/UserProfile'
import Layout from '../../components/templates/Layout'
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
    <Layout>
      <Flex flexDriection="row">
        <Sidebar />
        <UserProfile
          userProfileData={userProfileData}
          loading={loading}
          userId={userId}
          currentUserId={currentUserId}
          onEditUserProfile={onEditUserProfile}
          setOnEditUserProfile={setOnEditUserProfile}
          editedUserProfileData={editedUserProfileData}
          setEditedUserProfileData={setEditedUserProfileData}
          onChangeUserProfileData={onChangeUserProfileData}
          onClickEdit={onClickEdit}
          onSubmitUserProfile={onSubmitUserProfile}
        />
      </Flex>
    </Layout>
  )
}

export default userProfile
