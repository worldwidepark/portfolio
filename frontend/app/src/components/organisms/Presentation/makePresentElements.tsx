import React from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import {
  FaFistRaised,
  FaBookOpen,
  FaRegCalendarAlt,
  FaProjectDiagram,
  FaRegClock,
} from 'react-icons/fa'
interface MakePresentElementsType {
  element: any
  elementName: string
  onChangePresentState: (element: any, elementName: string) => void
}

export const MakePresentElements = ({
  element,
  elementName,
  onChangePresentState,
}: MakePresentElementsType) => {
  return (
    <>
      {elementName === 'achivement' ? (
        <Box
          position="relative"
          padding="15px"
          height="50vh"
          width="100%"
          border="1px solid rgb(200, 200, 200)"
          fontSize="20px"
          whiteSpace="pre-line"
        >
          <Box width="100%" backgroundColor={element.present ? 'pink' : 'grey'}>
            <Flex>
              <Box
                position="relative"
                padding="15px"
                height="50vh"
                width="100%"
                border="1px solid rgb(200, 200, 200)"
                fontSize="20px"
                whiteSpace="pre-line"
              >
                <Box padding="15px" fontSize="30px" textAlign="center">
                  {element.title}
                </Box>
                <Box height="50%" wordBreak="break-all" overflow="auto">
                  {element.text}
                </Box>
                <Flex
                  position="absolute"
                  alignItems="center"
                  color="rgb(120, 120, 120)"
                  width="100%"
                  top="92%"
                >
                  <Flex
                    fontSize="clamp(0.6em, 1.0vw, 1.0em)"
                    width="300px"
                    position="absolute"
                    flexDirection="row"
                    alignItems="center"
                    left="5%"
                  >
                    <FaRegCalendarAlt />
                    <Box margin="0px 5px" color="rgb(120, 120, 120)">
                      {element.startDateOn} 〜{' '}
                    </Box>
                    <div>{element.endDateOn}</div>
                  </Flex>
                  <Flex
                    position="absolute"
                    left="70%"
                    alignItems="center"
                    justifyContent="space-between"
                    color="rgb(120, 120, 120)"
                    width="140px"
                  >
                    {element.present ? (
                      <button
                        onClick={() =>
                          onChangePresentState(element, elementName)
                        }
                      >
                        非公開
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onChangePresentState(element, elementName)
                        }
                      >
                        公開
                      </button>
                    )}
                  </Flex>
                </Flex>
              </Box>
              <Box position="absolute" top="350px" left="25px">
                {element.urls.map((url, index) => (
                  <Box
                    color="rgb(246, 208, 66)"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    fontSize="clamp(0.4em, 1.0vw, 0.8em)"
                  >
                    <a href={url}>
                      ・参考URL{index + 1} : {url}
                    </a>
                  </Box>
                ))}
              </Box>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Flex padding="10px 0px">
          <Box
            width="80vh"
            backgroundColor={element.present ? 'black' : 'grey'}
          >
            <Box
              position="relative"
              padding="15px"
              height="30vh"
              width="100%"
              border="1px solid rgb(200, 200, 200)"
              fontSize="20px"
              whiteSpace="pre-line"
            >
              <Box height="85%" wordBreak="break-all" overflow="auto">
                <div>{element.text}</div>
              </Box>
              <Flex
                position="absolute"
                top="85%"
                width="100%"
                justifyContent="space-between"
                color="rgb(120, 120, 120)"
              >
                <Flex position="absolute" alignItems="center" width="120px">
                  <FaRegClock />
                  <Box margin="0px 5px 0px 5px" color="rgb(120, 120, 120)">
                    {element.time}
                    {element.time > 1 ? ' hrs' : '  hr'}
                  </Box>
                </Flex>
                <Flex
                  position="absolute"
                  left="25%"
                  alignItems="center"
                  justifyContent="space-between"
                  color="rgb(120, 120, 120)"
                  width="140px"
                >
                  <FaRegCalendarAlt />
                  <div>{element.reportDateOn}</div>
                </Flex>
                <Flex
                  position="absolute"
                  left="70%"
                  alignItems="center"
                  justifyContent="space-between"
                  color="rgb(120, 120, 120)"
                  width="140px"
                >
                  {element.present ? (
                    <button
                      onClick={() => onChangePresentState(element, elementName)}
                    >
                      非公開
                    </button>
                  ) : (
                    <button
                      onClick={() => onChangePresentState(element, elementName)}
                    >
                      公開
                    </button>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  )
}
