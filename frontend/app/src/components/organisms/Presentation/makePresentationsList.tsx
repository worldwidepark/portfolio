import React, { useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { getPresentationsList } from '../../../services/presentation/presentation'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'

export const MakePresentationsList = ({
  dailyReports,
  achivements,
  loading,
  userId,
  MakePresentElements,
  dailyReportsPresent,
  setDailyReportsPresent,
  achivementsPresent,
  setAchivementsPresent,
  onChangePresentState,
  wholeTime,
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
                  <MakePresentElements
                    element={element}
                    elementName={'achivement'}
                    onChangePresentState={onChangePresentState}
                  />
                </div>
              ))}
            </Box>
            <Box width="100vh" backgroundColor="blue">
              <span>総時間: {wholeTime}</span>
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
          </>
        )}
      </Flex>
    </>
  )
}
