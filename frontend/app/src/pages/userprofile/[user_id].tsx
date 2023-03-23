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
import { ImageInputForm } from '../../components/organisms/UserProfile/imageInputForm'
import { SearchProgrammingLanguageTags } from '../../components/organisms/ProgrammingLanguage'
import {
  deleteProgrammingLanguageData,
  getProgrammingLanguagesData,
  postProgrammingLanguageData,
  searchProgrammingLanguagesData,
} from '../../services/programmingLanguage/programmingLanguage'
import { setServers } from 'dns'

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
  const [onEditImage, setOnEditImage] = useState(false)
  const [programmingLanguageTags, setProgramminglanguageTags] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  useEffect(() => {
    if (router.isReady) {
      setUserId(Number(user_id))
      setLoading(false)
    }
  }, [user_id])

  useEffect(() => {
    if (typeof userId === 'number') {
      getUserProfileData(userId).then((userProfileData) => {
        setUserProfileData(userProfileData)
      })
      getProgrammingLanguagesData(userId).then((programmingLanguageData) => {
        setProgramminglanguageTags(programmingLanguageData)
      })
      if (currentUserId === userId) setIsCurrentUser(true)
    }
  }, [userId, currentUserId])

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
  const deleteAndGet = async (tagId) => {
    await deleteProgrammingLanguageData(currentUserId, tagId)
    getProgrammingLanguagesData(userId).then((programmingLanguageData) => {
      setProgramminglanguageTags(programmingLanguageData)
    })
  }
  const onClickDeleteProgrammingLanguageTag = (tagId) => {
    deleteAndGet(tagId)
  }

  const onSubmitUserProfileImage = (event) => {
    event.preventDefault()
    const image = event.target.image.files[0]
    editUserProfileImage(currentUserId, image).then((userProfileData) => {
      setUserProfileData(userProfileData)
      setOnEditImage(false)
      setPreview(false)
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

  const onChangeProgrammingLanguageTags = (data) => {
    setSearchInput(data)
    if (data === '') {
      setSearchedResults([])
    } else {
      searchProgrammingLanguagesData(currentUserId, data).then((tags) => {
        setSearchedResults(tags)
        console.log(tags)
      })
    }
  }

  const postAndGet = async () => {
    await postProgrammingLanguageData(currentUserId, searchInput)
    getProgrammingLanguagesData(userId).then((programmingLanguageData) => {
      setProgramminglanguageTags(programmingLanguageData)
    })
  }

  const onSubmitProgrammingLanguageTags = (event) => {
    event.preventDefault()
    postAndGet()
    setSearchInput('')
    setSearchedResults([])
  }

  return (
    <Layout>
      <Flex flexDriection="row">
        <Sidebar />
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            <ImageInputForm
              isCurrentUser={isCurrentUser}
              userProfileData={userProfileData}
              onSubmitUserProfileImage={onSubmitUserProfileImage}
              preview={preview}
              onChangeFile={onChangeFile}
              onEditImage={onEditImage}
              setOnEditImage={setOnEditImage}
            />
            <UserProfile
              isCurrentUser={isCurrentUser}
              userProfileData={userProfileData}
              userId={userId}
              urlItem={urlItem}
              currentUserId={currentUserId}
              onEditUserProfile={onEditUserProfile}
              editedUserProfileData={editedUserProfileData}
              setEditedUserProfileData={setEditedUserProfileData}
              onChangeUserProfileData={onChangeUserProfileData}
              onChangeUrl={onChangeUrl}
              onClickEdit={onClickEdit}
              onSubmitUserProfile={onSubmitUserProfile}
            />
            <SearchProgrammingLanguageTags
              isCurrentUser={isCurrentUser}
              programmingLanguageTags={programmingLanguageTags}
              searchInput={searchInput}
              searchedResults={searchedResults}
              setSearchInput={setSearchInput}
              onSubmitProgrammingLanguageTags={onSubmitProgrammingLanguageTags}
              onChangeProgrammingLanguageTags={onChangeProgrammingLanguageTags}
              onClickDeleteProgrammingLanguageTag={
                onClickDeleteProgrammingLanguageTag
              }
            />
          </>
        )}
      </Flex>
    </Layout>
  )
}

export default userProfile
