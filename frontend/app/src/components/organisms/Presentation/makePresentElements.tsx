import React from 'react'
import { Box } from '../../layout/Box'
import { Flex } from '../../layout/Flex'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
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
          padding="10px"
          height="50vh"
          width="100%"
          fontSize="20px"
          whiteSpace="pre-line"
          borderRadius="10px"
        >
          <Flex>
            <Box
              position="relative"
              backgroundColor={element.present ? 'white' : 'grey'}
              padding="15px"
              height="47vh"
              width="100%"
              border="1px solid rgb(200, 200, 200)"
              fontSize="20px"
              whiteSpace="pre-line"
              borderRadius="10px"
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
                bottom="20px"
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
                  right="5%"
                  alignItems="center"
                  justifyContent="space-between"
                  color="rgb(120, 120, 120)"
                  width="140px"
                >
                  {element.present ? (
                    <Button
                      fontWeight="600"
                      lineHeight="1.5"
                      position="relative"
                      display="inline-block"
                      margin="30px"
                      width="100%"
                      cursor="pointer"
                      textAlign="center"
                      borderRadius="0.5rem"
                      backgroundColor="#fff"
                      border="1px solid rgb(100, 100, 100)"
                      backgroundColorOnhovered=" rgb(246, 208, 66)"
                      onClick={() => onChangePresentState(element, elementName)}
                    >
                      非公開
                    </Button>
                  ) : (
                    <Button
                      fontWeight="600"
                      lineHeight="1.5"
                      position="relative"
                      display="inline-block"
                      margin="30px"
                      width="100%"
                      cursor="pointer"
                      textAlign="center"
                      borderRadius="0.5rem"
                      backgroundColor="#fff"
                      border="1px solid rgb(100, 100, 100)"
                      backgroundColorOnhovered=" rgb(246, 208, 66)"
                      onClick={() => onChangePresentState(element, elementName)}
                    >
                      公開
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Box>
            <Box position="absolute" top="330px" left="25px" width="80%">
              {element.urls.map((url, index) => (
                <Box
                  color="rgb(200,200,200)"
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
      ) : (
        <Flex padding="10px">
          <Box
            backgroundColor={element.present ? 'white' : 'grey'}
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
                  <Button
                    fontWeight="600"
                    lineHeight="1.5"
                    position="relative"
                    display="inline-block"
                    margin="0px 30px"
                    width="100%"
                    cursor="pointer"
                    textAlign="center"
                    borderRadius="0.5rem"
                    backgroundColor="#fff"
                    border="1px solid rgb(100, 100, 100)"
                    backgroundColorOnhovered=" rgb(246, 208, 66)"
                    onClick={() => onChangePresentState(element, elementName)}
                  >
                    非公開
                  </Button>
                ) : (
                  <Button
                    fontWeight="600"
                    lineHeight="1.5"
                    position="relative"
                    display="inline-block"
                    margin="0px 30px"
                    width="100%"
                    cursor="pointer"
                    textAlign="center"
                    borderRadius="0.5rem"
                    backgroundColor="#fff"
                    border="1px solid rgb(100, 100, 100)"
                    backgroundColorOnhovered=" rgb(246, 208, 66)"
                    onClick={() => onChangePresentState(element, elementName)}
                  >
                    公開
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  )
}
