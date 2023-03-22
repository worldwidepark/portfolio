import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { UrlsInputForms } from '../../molecules/UserProfile/urlsInputForms'
export const UserProfile = ({
  userProfileData,
  loading,
  userId,
  urlItem,
  currentUserId,
  onEditUserProfile,
  setOnEditUserProfile,
  preview,
  editedUserProfileData,
  setEditedUserProfileData,
  onChangeFile,
  onChangeUserProfileData,
  onSubmitUserProfileImage,
  onChangeUrl,
  onClickEdit,
  onSubmitUserProfile,
}) => {
  return (
    <Flex flexDirection="column">
      {onEditUserProfile ? (
        <>
          <form onSubmit={onSubmitUserProfile}>
            <div>
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  onChangeUserProfileData('name', e.target.value)
                }
                value={editedUserProfileData.name}
              />
            </div>
            <div>
              <textarea
                name="introduce"
                onChange={(e) =>
                  onChangeUserProfileData('introduce', e.target.value)
                }
                value={editedUserProfileData.introduce}
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                name="occupation"
                onChange={(e) =>
                  onChangeUserProfileData('occupation', e.target.value)
                }
                value={editedUserProfileData.occupation}
              />
            </div>
            <UrlsInputForms
              onChangeUrl={onChangeUrl}
              editedUserProfileData={editedUserProfileData}
              setEditedUserProfileData={setEditedUserProfileData}
            />
            <button type="submit">編集</button>
          </form>
        </>
      ) : (
        <>
          <div>{userProfileData.name}</div>
          <div>{userProfileData.introduce}</div>
          <div>{userProfileData.occupation}</div>
          <div>{urlItem}</div>

          {currentUserId == userId && (
            <button onClick={() => onClickEdit()}>edit</button>
          )}
        </>
      )}
    </Flex>
  )
}
