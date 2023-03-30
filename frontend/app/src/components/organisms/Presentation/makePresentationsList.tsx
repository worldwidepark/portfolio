import React, { useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { getPresentationsList } from '../../../services/presentation/presentation'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'

export const MakePresentationsList = ({
  dailyReports,
  achivements,
  userInfo,
  MakePresentElements,
  onChangePresentState,
}) => {
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
