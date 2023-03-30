import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'

export const PresentationsList = ({
  dailyReports,
  achivements,
  userId,
  PresentElements,
  userInfo,
  programmingLanguageTags,
  urlItem,
}) => {
  return (
    <>
      <Flex flexDirection="column">
        <div>
          <div>
            <img src={userInfo.image} />
          </div>
          <div>{userInfo.name}</div>
          <div>{userInfo.introduce}</div>
          <div>{userInfo.occupation}</div>
          <div>{urlItem}</div>
          <div>
            {programmingLanguageTags.map((tag) => (
              <div key={tag.id}>{tag.name}</div>
            ))}
          </div>
        </div>
        <Box width="100vh" backgroundColor="green">
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
        <Box width="100vh" backgroundColor="blue">
          <>
            <span>総時間: {userInfo.combinedTime}</span>
            {dailyReports.map((element) => (
              <div key={element.id}>
                {element.present ? (
                  <PresentElements
                    userId={userId}
                    element={element}
                    elementName={'dailyReport'}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        </Box>
      </Flex>
    </>
  )
}
