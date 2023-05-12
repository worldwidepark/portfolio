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

interface PresentationsListType {
  dailyReports: DailyReportType[]
  achivements: AchivementType[]
  PresentElements: any
  userInfo: UserProfileType
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

const Summary = styled.summary`
  margin: 10px 20px;
  padding: 10px;
  cursor: pointer;
  font-size: 25px;
`

export const PresentationsList = ({
  dailyReports,
  achivements,
  PresentElements,
  userInfo,
  programmingLanguageTags,
  urlItem,
}: PresentationsListType) => {
  return (
    <>
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
          margin="0px auto"
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

          <Flex width="300px" flexWrap="wrap">
            {programmingLanguageTags.map((tag) => (
              <Box
                margin="5px 0px 0px 10px"
                padding="5px"
                fontSize="18px"
                backgroundColor="rgb(200,255,47)"
                borderRadius="100px"
                color="grey"
                key={tag.id}
                border="none"
              >
                {tag.name}
              </Box>
            ))}
          </Flex>
          <Box margin="20px 0px 0px 0px" fontSize="24px" fontWeight="bold">
            総学習時間: {userInfo.combinedTime}h
          </Box>
        </Flex>
        <Box width="100%">
          {achivements.map((element) => (
            <div key={element.id}>
              {element.present ? (
                <>
                  <PresentElements
                    element={element}
                    elementName={'achivement'}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </Box>
        <Box width="100%">
          <>
            {dailyReports.some((element) => element.present) ? (
              <>
                <details>
                  <Summary>日報を開く</Summary>
                  {dailyReports.map((element) => (
                    <div key={element.id}>
                      {element.present ? (
                        <PresentElements
                          element={element}
                          elementName={'dailyReport'}
                        />
                      ) : null}
                    </div>
                  ))}
                </details>
              </>
            ) : null}
          </>
        </Box>
      </Flex>
    </>
  )
}
