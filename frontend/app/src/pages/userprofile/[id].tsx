import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Text } from '../../components/atoms/Text'
import { Box } from '../../components/layout/Box'
import { getUserProfileData } from '../../services/userprofile/userInfo'
// todo: idの渡し方。
const userProfile = () => {
  const routher = useRouter()
  const id = routher.query
  const [userProfile, setUserProfile] = useState({})
  const [workExperiences, setWorkExperiences] = useState([])
  useEffect(() => {
    getUserProfileDataWithParams({ id })
  }, [])
  const getUserProfileDataWithParams = (userId) => {
    getUserProfileData(userId).then((userProfileData) => {
      setUserProfile(userProfileData.user)
      setWorkExperiences(userProfileData.work_experiences)
    })
  }

  return (
    <>
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

export default userProfile
