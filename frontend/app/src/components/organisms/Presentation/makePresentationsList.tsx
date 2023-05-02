import React, { ReactNode } from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import {
  AchivementType,
  DailyReportType,
  UserProfileTagsType,
  UserProfileType,
} from '../../../types/types'
import styled from 'styled-components'

interface MakePresentationsListType {
  dailyReports: DailyReportType[]
  achivements: AchivementType[]
  userInfo: UserProfileType
  MakePresentElements: any
  onChangePresentState: (element: any, elementName: string) => void
  programmingLanguageTags: UserProfileTagsType[]
  urlItem: ReactNode
}
const Img = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
  object-fit: cover;
  margin-bottom: 20px;
`

export const MakePresentationsList = ({
  dailyReports,
  achivements,
  userInfo,
  programmingLanguageTags,
  urlItem,
  MakePresentElements,
  onChangePresentState,
}: MakePresentationsListType) => {
  return (
    <Flex
      flexDirection="column"
      width="40%"
      border="1px solid #ccc"
      margin="5px"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding="20px"
        borderRadius="10px"
        width="90%"
        margin="auto"
      >
        <Box>
          <Img src={userInfo.image} />
        </Box>
        <Box fontSize="24px" fontWeight="bold" margin="0px 0px 10px">
          {userInfo.name}
        </Box>
        <Box fontSize="16px" margin="0px 0px 10px" height="50px">
          {userInfo.introduce}
        </Box>
        <Box fontSize="14px" margin="0px 0px 10px">
          {userInfo.occupation}
        </Box>
        <Box fontSize="24px" margin="0px 0px 10px">
          {urlItem}
        </Box>

        <div>
          {programmingLanguageTags.map((tag) => (
            <Box key={tag.id}>{tag.name}</Box>
          ))}
        </div>
        <Box margin="20px 0px 0px 0px" fontSize="14px" fontWeight="bold">
          総学習時間: {userInfo.combinedTime}h
        </Box>
      </Flex>
      <Box width="100%">
        {achivements.map((element) => (
          <div key={element.id}>
            <MakePresentElements
              element={element}
              elementName={'achivement'}
              onChangePresentState={onChangePresentState}
            />
          </div>
        ))}
      </Box>
      <Box width="100%">
        {dailyReports.map((element) => (
          <div key={element.id}>
            <MakePresentElements
              element={element}
              elementName={'dailyReport'}
              onChangePresentState={onChangePresentState}
            />
          </div>
        ))}
      </Box>
    </Flex>
  )
}
