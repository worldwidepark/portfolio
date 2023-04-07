import React, { forwardRef, useRef } from 'react'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { UrlsInputForms } from '../../molecules/Achivement/urlsInputForms'
import { AchivementType } from '../../../types/types'
import styled from 'styled-components'
import { Box } from '../../layout/Box'
import { Input } from '../../atoms/Input'
import { Textarea } from '../../atoms/Textarea'
import {
  FaFistRaised,
  FaBookOpen,
  FaRegCalendarAlt,
  FaTrashAlt,
  FaRegEdit,
  FaProjectDiagram,
} from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import CalInput from '../../atoms/Input/calInput'

interface AchivementsListType {
  achivements: AchivementType[]
  editEndDate: Date | null
  editInputRef: React.RefObject<HTMLInputElement>
  editedAchivement: AchivementType
  editStartDate: Date | null
  endDate: Date | null
  handleSubmit: (e: any) => void
  inputData: {
    title: string
    text: string
    urls: string[]
  }
  onChangeDate: (e: any) => void
  onChangeEditInput: (key: string, value: any) => void
  onChangeInputData: (key: string, value: string | string[] | undefined) => void
  onChangeUrl: (
    name: string,
    value: string,
    data: AchivementType,
    setData: React.Dispatch<React.SetStateAction<AchivementType>>,
    achivementLength: number
  ) => void
  onDeleteAchivement: (achivementId: number) => void
  onEditAchivement: (achivement: AchivementType) => void
  onEditAchivementInput: (achivement: AchivementType) => void
  onEditChangeDate: (dates: [Date | null, Date | null]) => void
  setEditedAchivement: React.Dispatch<React.SetStateAction<AchivementType>>
  setInputData: React.Dispatch<
    React.SetStateAction<{
      title: string
      text: string
      urls: string[]
    }>
  >
  startDate: Date
  Today: Date
}

const Title = styled.div`
  font-size: clamp(0.8em, 1.5vw, 1.8em);
  text-align: center;
  padding: 0px 0px 5px 0px;
  line-height: 0.95em;
  font-weight: bold;
  text-shadow: 0 0.03em 0.03em #ffab91, 0 0.03em 0.03em #000,
    0 0.03em 0.03em #fbe9e7;
`
const CustomCalInput = forwardRef((props: any, ref) => {
  return <CalInput {...props} ref={ref} />
})

export const AchivementsList = ({
  achivements,
  editEndDate,
  editInputRef,
  editedAchivement,
  editStartDate,
  endDate,
  handleSubmit,
  inputData,
  onChangeDate,
  onChangeEditInput,
  onChangeInputData,
  onChangeUrl,
  onDeleteAchivement,
  onEditAchivement,
  onEditAchivementInput,
  onEditChangeDate,
  setEditedAchivement,
  setInputData,
  startDate,
  Today,
}: AchivementsListType) => {
  const inputRef = useRef(null)
  return (
    <>
      <Flex flexDirection="row" width="100%" height="100vh">
        <Flex
          flexDirection="column"
          position="fixed"
          width="30%"
          top="80px"
          padding="15px 30px 100px 10px"
          borderRight="1px solid rgb(230, 230, 230)"
        >
          <Title>
            <Box padding="0px 0px 0px 15px">あなたの成果を教えてください！</Box>
          </Title>
          <form onSubmit={handleSubmit}>
            <div>
              <Box padding="10px 20px 0px 20px">
                <Box padding="5px" fontSize="25px" color="rgb(15, 0, 65)">
                  <FaFistRaised />
                </Box>
                <Input
                  type="text"
                  name="title"
                  value={inputData.title}
                  onChange={(e) => onChangeInputData('title', e.target.value)}
                  placeholder="題名を記入してください。"
                  width="100%"
                  height="35px"
                  paddingLeft="15px"
                  border="1px solid rgb(62, 244, 4)"
                  borderRadius="0.4em"
                  borderOnFocused="1px solid rgb(246, 208, 66)"
                  fontSize="20px"
                  backgroundColor="rgb(250, 250, 250)"
                  outline="none"
                  required
                />
              </Box>
              <Box padding="10px 20px 0px 20px">
                <Textarea
                  type="text"
                  name="text"
                  value={inputData.text}
                  onChange={(e) => onChangeInputData('text', e.target.value)}
                  placeholder="内容を記入してください。"
                  required
                  padding="15px"
                  height="30vh"
                  resize="none"
                  width="100%"
                  border="1px solid rgb(62, 244, 4)"
                  borderRadius="0.4em"
                  fontSize="20px"
                  backgroundColor="rgb(250, 250, 250)"
                  borderOnFocused="1px solid rgb(246, 208, 66)"
                  outline="none"
                />
              </Box>
              <Box padding="2px 20px 5px 20px" height="100px">
                <Box padding="3px" fontSize="15px" color="rgb(15, 0, 65)">
                  <FaProjectDiagram />
                </Box>
                <UrlsInputForms
                  onChangeUrl={onChangeUrl}
                  achivement={inputData}
                  setAchivement={setInputData}
                />
              </Box>
            </div>
            <Box padding="0px 20px 10px 20px">
              <Box padding="5px" fontSize="25px" color="rgb(15, 0, 65)">
                <FaRegCalendarAlt />
              </Box>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                maxDate={Today}
                selected={startDate}
                onChange={onChangeDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange={true}
                customInput={<CustomCalInput inputRef={inputRef} />}
                popperPlacement="top"
              />
            </Box>
            <Box padding="0px 65px 10px 0px">
              <Button
                type="submit"
                fontSize="1.4rem"
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
              >
                登 録
              </Button>
            </Box>
          </form>
        </Flex>
        <Flex
          flexDirection="column"
          position="absolute"
          left="40%"
          top="10px"
          width="50%"
        >
          <>
            <Box padding="10px 0px" height="90vh">
              {achivements.map((achivement) => (
                <div key={achivement.id}>
                  {editedAchivement.id === achivement.id ? (
                    <form onSubmit={() => onEditAchivement(editedAchivement)}>
                      <input
                        type="text"
                        value={editedAchivement.title}
                        ref={editInputRef}
                        onChange={(e) =>
                          onChangeEditInput('title', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={editedAchivement.text}
                        onChange={(e) =>
                          onChangeEditInput('text', e.target.value)
                        }
                      />
                      <UrlsInputForms
                        onChangeUrl={onChangeUrl}
                        achivement={editedAchivement}
                        setAchivement={setEditedAchivement}
                      />
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        maxDate={Today}
                        selected={editStartDate}
                        onChange={onEditChangeDate}
                        startDate={editStartDate}
                        endDate={editEndDate}
                        selectsRange
                        inline
                        required
                      />
                      <button type="submit">edit</button>
                    </form>
                  ) : (
                    <Flex padding="10px 0px">
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
                          {achivement.title}
                        </Box>
                        <Box>{achivement.text}</Box>
                        {achivement.urls.map((url) => (
                          <div>{url}</div>
                        ))}
                        <div>{achivement.startDateOn}</div>
                        <div>{achivement.endDateOn}</div>
                        <button
                          onClick={() => onDeleteAchivement(achivement.id)}
                        >
                          x
                        </button>
                        <button
                          onClick={() => onEditAchivementInput(achivement)}
                        >
                          edit
                        </button>
                      </Box>
                    </Flex>
                  )}
                </div>
              ))}
            </Box>
          </>
        </Flex>
      </Flex>
    </>
  )
}
