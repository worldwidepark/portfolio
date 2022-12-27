import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getUserProfileData } from '../../../services/userprofile/userInfo'
import { Text } from '../../atoms/Text'
import { Box } from '../../layout/Box'

export const UserProfile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState({})
  const [workExperiences, setWorkExperiences] = useState([])
  useEffect(() => {
    getUserProfileDataWithParams(userId)
  }, [userId])
  const getUserProfileDataWithParams = (id) => {
    getUserProfileData(id).then((userProfileData) => {
      setUserProfile(userProfileData.user)
      setWorkExperiences(userProfileData.work_experiences)
    })
  }

  return (
    <>
      {userProfile.id}
      {/* <Text>{data.id}</Text> */}
      {/* {console.log(data.id, 'return')} */}
      {workExperiences.map((item, index) => (
        <Link href="/userprofile">
          <Box width="70%" backgroundColor="green">
            <Text fontSize="sm">{item.job_title}</Text>
          </Box>
        </Link>
      ))}
    </>
  )
}
