import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getUserProfileListData } from '../../../services/userprofile/userInfo'
import { Text } from '../../atoms/Text'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { UserProfile } from './userProfile'

export const UserProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([])
  const [userId, setUserId] = useState()
  const [modalId, setModalId] = useState(0)
  useEffect(() => {
    UserProfileData()
  }, [])

  const UserProfileData = () => {
    getUserProfileListData().then((userProfileList) => {
      setUserProfiles(userProfileList)
      console.log(userProfileList)
    })
  }
  const getUserProfile = (id) => {
    setUserId(id)
    setModalId(id)
  }

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        {userProfiles.map((userProfile) => (
          <div onClick={() => getUserProfile(userProfile.id)}>
            <Box width="70%" backgroundColor="green">
              <Text fontSize="sm">{userProfile.email}</Text>
              <Text fontSize="sm">{userProfile.provider}</Text>
            </Box>
          </div>
        ))}
      </Flex>
      <Flex flexDirection="column">
        <Box>{modalId === userId ? <UserProfile userId={userId} /> : null}</Box>
      </Flex>
    </Flex>
  )
}
