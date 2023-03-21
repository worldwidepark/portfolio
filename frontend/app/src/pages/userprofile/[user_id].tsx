import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Flex } from '../../components/layout/Flex'
import { Sidebar } from '../../components/organisms/Sidebar'
import { UserProfile } from '../../components/organisms/UserProfile'
import Layout from '../../components/templates/Layout'
import { AuthContext } from '../../contexts/AuthContext'
import {
  editUserProfileData,
  editUserProfileImage,
  getUserProfileData,
} from '../../services/userprofile/userProfile'
import { FaGithub, FaTwitter, FaBlogger, FaHome } from 'react-icons/fa'
import { setPriority } from 'os'

const userProfile = () => {
  const router = useRouter()
  const { user_id } = router.query
  const [userProfileData, setUserProfileData] = useState({})
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(true)
  const [editedUserProfileData, setEditedUserProfileData] = useState({})
  const [preview, setPreview] = useState('')
  const [onEditUserProfile, setOnEditUserProfile] = useState(false)
  const { currentUserId } = useContext(AuthContext)
  const [urlItem, setUrlItem] = useState('')

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

  useEffect(() => {
    if (userProfileData.url) {
      if (userProfileData.url.url === '') {
        return setUrlItem('')
      }
      setUrlItem(selectedChecker(userProfileData.url))
    }
  }, [userProfileData])

  const selectedChecker = (urlInfo) => {
    switch (urlInfo.selected) {
      case 'twitter':
        return (
          <a href={urlInfo.url}>
            <FaTwitter />
          </a>
        )
      case 'gitHub':
        return (
          <a href={urlInfo.url}>
            <FaGithub />
          </a>
        )
      case 'blog':
        return (
          <a href={urlInfo.url}>
            <FaBlogger />
          </a>
        )
      case 'homepage':
        return (
          <a href={urlInfo.url}>
            <FaHome />
          </a>
        )
      case '':
        return
    }
  }

  const onChangeUserProfileData = (key, value) => {
    setEditedUserProfileData({ ...editedUserProfileData, [key]: value })
  }

  const onClickEdit = () => {
    setOnEditUserProfile(true)
    setEditedUserProfileData(userProfileData)
  }

  const onChangeUrl = (key, value) => {
    setEditedUserProfileData({
      ...editedUserProfileData,
      url: { ...editedUserProfileData.url, [key]: value },
    })
    console.log(editedUserProfileData)
  }

  const onChangeFile = (e) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
  }
  const onSubmitUserProfileImage = (event) => {
    event.preventDefault()
    const image = event.target.image.files[0]
    editUserProfileImage(currentUserId, image).then((userProfileData) => {
      setUserProfileData(userProfileData)
      // setOnEditUserProfile(false)
    })
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
          urlItem={urlItem}
          currentUserId={currentUserId}
          onEditUserProfile={onEditUserProfile}
          setOnEditUserProfile={setOnEditUserProfile}
          editedUserProfileData={editedUserProfileData}
          setEditedUserProfileData={setEditedUserProfileData}
          preview={preview}
          onChangeFile={onChangeFile}
          onChangeUserProfileData={onChangeUserProfileData}
          onSubmitUserProfileImage={onSubmitUserProfileImage}
          onChangeUrl={onChangeUrl}
          onClickEdit={onClickEdit}
          onSubmitUserProfile={onSubmitUserProfile}
        />
      </Flex>
    </Layout>
  )
}

export default userProfile
