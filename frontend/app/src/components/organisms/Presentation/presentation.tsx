import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'

export const PresentationsList = ({
  dailyReports,
  achivements,
  loading,
  userId,
  PresentElements,
}) => {
  const { combinedTime } = useContext(AuthContext)
  return (
    <>
      <Flex flexDirection="column">
        <Box width="100vh" backgroundColor="green">
          {achivements.map((element) => (
            <div key={element.id}>
              {element.present ? (
                <>
                  <PresentElements
                    userId={userId}
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
            <span>総時間: {combinedTime}</span>
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
