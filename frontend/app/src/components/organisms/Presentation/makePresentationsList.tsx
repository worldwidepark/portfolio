import React from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import {
  AchivementType,
  DailyReportType,
  UserProfileType,
} from '../../../types/types'

interface MakePresentationsListType {
  dailyReports: DailyReportType[]
  achivements: AchivementType[]
  userInfo: UserProfileType
  MakePresentElements: any
  onChangePresentState: (element: any, elementName: string) => void
}

export const MakePresentationsList = ({
  dailyReports,
  achivements,
  userInfo,
  MakePresentElements,
  onChangePresentState,
}: MakePresentationsListType) => {
  return (
    <>
      <Flex flexDirection="column">
        <Box width="100vh" backgroundColor="green">
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
        <Box width="100vh" backgroundColor="blue">
          <span>総時間: {userInfo.combinedTime}</span>
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
    </>
  )
}
