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
} from '../../services/userProfile/userProfile'
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
import itemForUrl from '../../components/molecules/UserProfile/itemForUrl'
import { UserProfileTagsType, UserProfileType } from '../../types/types'

const userProfile = () => {
  const router = useRouter()
  const { user_id } = router.query
  const [userProfileData, setUserProfileData] = useState<UserProfileType>({})
  const [userId, setUserId] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const [editedUserProfileData, setEditedUserProfileData] =
    useState<UserProfileType>({})
  const [preview, setPreview] = useState<string | boolean>('')
  const [onEditUserProfile, setOnEditUserProfile] = useState<boolean>(false)
  const { currentUserId } = useContext(AuthContext)
  const [urlItem, setUrlItem] = useState<string | Element>('')
  const [onEditImage, setOnEditImage] = useState<boolean>(false)
  const [programmingLanguageTags, setProgramminglanguageTags] = useState<
    UserProfileTagsType[]
  >([])
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchedResults, setSearchedResults] = useState<UserProfileTagsType[]>(
    []
  )
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)

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
      setUrlItem(itemForUrl(userProfileData.url))
    }
  }, [userProfileData])

  const onChangeUserProfileData = (key: string, value: string) => {
    setEditedUserProfileData({ ...editedUserProfileData, [key]: value })
  }

  const onClickEdit = () => {
    setOnEditUserProfile(true)
    setEditedUserProfileData(userProfileData)
  }

  const onChangeUrl = (key: string, value: string) => {
    setEditedUserProfileData({
      ...editedUserProfileData,
      url: { ...editedUserProfileData.url, [key]: value },
    })
    console.log(editedUserProfileData)
  }

  const onChangeFile = (e: { target: { files: any } }) => {
    const { files } = e.target
    setPreview(window.URL.createObjectURL(files[0]))
  }
  const deleteAndGet = async (tagId: number) => {
    await deleteProgrammingLanguageData(currentUserId, tagId)
    getProgrammingLanguagesData(userId).then((programmingLanguageData) => {
      setProgramminglanguageTags(programmingLanguageData)
    })
  }
  const onClickDeleteProgrammingLanguageTag = (tagId: number): void => {
    deleteAndGet(tagId)
  }

  const onSubmitUserProfileImage = (event: {
    preventDefault: () => void
    target: { image: { files: any[] } }
  }) => {
    event.preventDefault()
    const image = event.target.image.files[0]
    editUserProfileImage(currentUserId, image).then((userProfileData) => {
      setUserProfileData(userProfileData)
      setOnEditImage(false)
      setPreview(false)
    })
  }

  const onSubmitUserProfile = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    editUserProfileData(currentUserId, editedUserProfileData).then(
      (userProfileData) => {
        setUserProfileData(userProfileData)
        setOnEditUserProfile(false)
      }
    )
  }

  const onChangeProgrammingLanguageTags = (data: string) => {
    setSearchInput(data)
    if (data === '') {
      setSearchedResults([])
    } else {
      searchProgrammingLanguagesData(currentUserId, data).then((tags) => {
        setSearchedResults(tags)
      })
    }
  }

  const postAndGet = async () => {
    await postProgrammingLanguageData(currentUserId, searchInput)
    getProgrammingLanguagesData(userId).then((programmingLanguageData) => {
      setProgramminglanguageTags(programmingLanguageData)
    })
  }

  const onSubmitProgrammingLanguageTags = (event: {
    preventDefault: () => void
  }) => {
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
              urlItem={urlItem}
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
