import React, { useEffect, useState } from 'react'
import { Text } from '../../atoms/Text'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { UserProfileType } from '../../../types/types'
import { searchUserProfileData } from '../../../services/userProfile/userProfile'

interface UserProfileListProps {
  userProfileListData: UserProfileType[]
  onClickList: (userId: number) => void
}

export const UserProfileList = ({
  userProfileListData,
  onClickList,
}: UserProfileListProps) => {
  useEffect(() => {
    setUserProfileList(userProfileListData)
  }, [])
  const [userProfileList, setUserProfileList] = useState<UserProfileType[]>([])
  const onChangeSearchTags = (e: string) => {
    if (e === '') {
      setUserProfileList(userProfileListData)
    } else {
      searchUserProfileData(e).then((data) => setUserProfileList(data))
    }
  }
  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <div>
          <input
            type="text"
            placeholder="使用スキルで検索"
            onChange={(e) => onChangeSearchTags(e.target.value)}
          />
        </div>
        {userProfileList.length === 0 ? (
          <>
            <div>検索結果がありません。</div>
          </>
        ) : (
          <>
            {userProfileList.map((userProfile) => (
              <div onClick={() => onClickList(userProfile.id)}>
                <Box width="450px" height="200px" backgroundColor="green">
                  {/* todo: 使用言語も入力すべき */}
                  <img width="50px" height="50px" src={userProfile.image} />
                  <Text fontSize="sm">
                    <span>
                      <div>{userProfile.combinedTime}</div>
                      <div>{userProfile.name}</div>
                    </span>
                    <span>
                      {userProfile.tags !== undefined && (
                        <>
                          {userProfile.tags.map((tag) => (
                            <div key={tag.id}>{tag.name}</div>
                          ))}
                        </>
                      )}
                    </span>
                  </Text>
                </Box>
              </div>
            ))}
          </>
        )}
      </Flex>
    </Flex>
  )
}
