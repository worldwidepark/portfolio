import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Text } from '../../atoms/Text'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { UserProfile } from './userProfile'

export const UserProfileList = ({ userProfileListData, onClickList }) => {
  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        {userProfileListData.map((userProfile) => (
          <div onClick={() => onClickList(userProfile.id)}>
            <Box width="450px" height="50px" backgroundColor="green">
              {/* <Text fontSize="sm">{userProfile.email}</Text> */}
              <Text fontSize="sm">{userProfile.name}</Text>
            </Box>
          </div>
        ))}
      </Flex>
    </Flex>
  )
}
