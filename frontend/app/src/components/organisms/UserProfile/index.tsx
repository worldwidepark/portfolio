import React, { ReactNode, useContext } from 'react'
import { Flex } from '../../layout/Flex'
import 'react-datepicker/dist/react-datepicker.css'
import { UrlsInputForms } from '../../molecules/UserProfile/urlsInputForms'
import { UserProfileType } from '../../../types/types'
import { Box } from '../../layout/Box'

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
          <Box fontSize="24px" fontWeight="bold" margin="0px 0px 10px">
            {userProfileData.name}
          </Box>
          <Box fontSize="16px" margin="0px 0px 10px" height="50px">
            {userProfileData.introduce}
          </Box>
          <Box fontSize="14px" margin="0px 0px 10px">
            {userProfileData.occupation}
          </Box>
          <Box fontSize="24px" margin="0px 0px 10px">
            {urlItem}
          </Box>

          {isCurrentUser && <button onClick={() => onClickEdit()}>edit</button>}
        </>
      )}
    </Flex>
  )
}
