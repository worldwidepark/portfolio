import React, { ReactNode } from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import {
  AchivementType,
  DailyReportType,
  UserProfileTagsType,
  UserProfileType,
} from '../../../types/types'

interface MakePresentationsListType {
  dailyReports: DailyReportType[]
  achivements: AchivementType[]
  userInfo: UserProfileType
  MakePresentElements: any
  onChangePresentState: (element: any, elementName: string) => void
  programmingLanguageTags: UserProfileTagsType[]
  urlItem: ReactNode
}

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
    <Flex flexDirection="column" width="40%">
      <div>
        <div>
          <img src={userInfo.image} />
        </div>
        <div>{userInfo.name}</div>
        <div>{userInfo.introduce}</div>
        <div>{userInfo.occupation}</div>
        <div>{urlItem}</div>
        <span>総学習時間: {userInfo.combinedTime}</span>
        <div>
          {programmingLanguageTags.map((tag) => (
            <div key={tag.id}>{tag.name}</div>
          ))}
        </div>
      </div>
      <Box width="100%" backgroundColor="green">
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
      <Box width="100%" backgroundColor="blue">
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
