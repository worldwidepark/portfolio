import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Text } from '../../atoms/Text'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { UserProfile } from './userProfile'

export const UserProfileList = ({ userProfileList }) => {
  const [userProfiles, setUserProfiles] = useState([])
  const [userId, setUserId] = useState()
  const [modalId, setModalId] = useState(0)

  const getUserProfile = (id) => {
    setUserId(id)
    setModalId(id)
  }
  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        {userProfileList.map((userProfile) => (
          <div onClick={() => getUserProfile(userProfile.id)}>
            <Box width="70%" backgroundColor="green">
              {/* <Text fontSize="sm">{userProfile.email}</Text> */}
              <Text fontSize="sm">{userProfile.name}</Text>
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
