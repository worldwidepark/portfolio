import React, { ReactNode, useContext } from 'react'
import { Flex } from '../../layout/Flex'
import 'react-datepicker/dist/react-datepicker.css'
import { UrlsInputForms } from '../../molecules/UserProfile/urlsInputForms'
import { UserProfileType } from '../../../types/types'

interface UserProfileProps {
  isCurrentUser: boolean
  userProfileData: UserProfileType
  urlItem: ReactNode
  onEditUserProfile: boolean
  editedUserProfileData: UserProfileType
  setEditedUserProfileData: React.Dispatch<
    React.SetStateAction<UserProfileType>
  >
  onChangeUserProfileData: (key: string, value: string) => void
  onChangeUrl: (key: string, value: string) => void
  onClickEdit: () => void
  onSubmitUserProfile: (e: any) => void
}

export const UserProfile = ({
  isCurrentUser,
  userProfileData,
  urlItem,
  onEditUserProfile,
  editedUserProfileData,
  setEditedUserProfileData,
  onChangeUserProfileData,
  onChangeUrl,
  onClickEdit,
  onSubmitUserProfile,
}: UserProfileProps) => {
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

          {isCurrentUser && <button onClick={() => onClickEdit()}>edit</button>}
        </>
      )}
    </Flex>
  )
}
