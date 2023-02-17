import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { PresentElement } from './presentElements'

export const PresentationsList = ({
  dailyReports,
  achivements,
  loading,
  userId,
  PresentElements,
}) => {
  return (
    <>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
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
          </>
        )}
      </Flex>
    </>
  )
}
