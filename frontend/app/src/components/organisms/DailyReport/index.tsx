import React, { forwardRef, useContext, useRef } from 'react'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DailyReportType } from '../../../types/types'
import styled from 'styled-components'
import CalInput from '../../atoms/Input/calInput'
import { Box } from '../../layout/Box'
import {
  FaBookOpen,
  FaRegCalendarAlt,
  FaRegClock,
  FaTrashAlt,
  FaRegEdit,
} from 'react-icons/fa'
import EditCalInput from '../../atoms/Input/editCalInput'
import { Input } from '../../atoms/Input'
import { Button } from '../../atoms/Button'
import { Textarea } from '../../atoms/Textarea'

interface DailyReportListType {
  combinedTime: number
  dailyReports: DailyReportType[]
  editInputRef: React.RefObject<HTMLTextAreaElement>
  editedDailyReport: DailyReportType
  editReportDateOn: Date
  handleSubmit: (e: any) => void
  inputData: { text: string; time: number | string }
  onChangeEditInput: (key: string, e: any) => void
  onChangeInputData: (key: string, e: any) => void
  onDeleteReport: (e: any) => void
  onEditReport: (e: any) => void
  onEditReportInput: (e: any) => void
  reportDateOn: Date
  onChangeEditReportDateOn: (selectedDate: Date | null) => void
  onChangeReportDateOn: (selectedDate: any) => void
  Today: Date
}

const Title = styled.div`
  font-size: 1.8em;
  padding: 5px 0px
  line-height: 0.95em;
  font-weight: bold;
  text-shadow: 0 0.03em 0.03em #ffab91, 0 0.03em 0.03em #000,
    0 0.03em 0.03em #fbe9e7;
`

const CustomCalInput = forwardRef((props: any, ref) => {
  return <CalInput {...props} ref={ref} />
})
const CustomEditCalInput = forwardRef((props: any, ref) => {
  return <EditCalInput {...props} ref={ref} />
})

interface Props {
  inputRef: React.Ref<HTMLInputElement>
}
export const DailyReportsList = ({
  combinedTime,
  dailyReports,
  editInputRef,
  editedDailyReport,
  editReportDateOn,
  handleSubmit,
  inputData,
  onChangeEditInput,
  onChangeInputData,
  onDeleteReport,
  onEditReport,
  onEditReportInput,
  reportDateOn,
  onChangeEditReportDateOn,
  onChangeReportDateOn,
  Today,
}: DailyReportListType) => {
  const inputRef = useRef(null)
  console.log(dailyReports)
  return (
    <>
      <Flex flexDirection="row" width="100%">
        <Flex
          flexDirection="column"
          position="fixed"
          width="30%"
          top="80px"
          padding="25px 30px 100px 10px"
          borderRight="1px solid rgb(230, 230, 230)"
        >
          <Title>
            <Box>今日のあなたの頑張りを</Box>
            <Box textAlign="right">教えてください！</Box>
          </Title>
          <form onSubmit={handleSubmit}>
            <Box padding="10px 20px 10px 20px">
              <Box padding="5px" fontSize="25px" color="rgb(15, 0, 65)">
                <FaBookOpen />
              </Box>
              <Textarea
                name="text"
                value={inputData.text}
                onChange={(e) => onChangeInputData('text', e.target.value)}
                placeholder="日報を記入してください。"
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
              ></Textarea>
            </Box>
            <Box padding="10px 20px 10px 20px">
              <Box padding="5px" fontSize="25px" color="rgb(15, 0, 65)">
                <FaRegClock />
              </Box>
              <Input
                width="100%"
                height="35px"
                paddingLeft="15px"
                border="1px solid rgb(62, 244, 4)"
                borderRadius="0.4em"
                borderOnFocused="1px solid rgb(246, 208, 66)"
                fontSize="20px"
                backgroundColor="rgb(250, 250, 250)"
                type="number"
                name="time"
                step="0.1"
                min="0.1"
                max="24"
                value={inputData.time}
                onChange={(e) => onChangeInputData('time', e.target.value)}
                placeholder="時間を記入してください。"
                outline="none"
                required
              />
            </Box>
            <Box padding="10px 20px 10px 20px">
              <Box padding="5px" fontSize="25px" color="rgb(15, 0, 65)">
                <FaRegCalendarAlt />
              </Box>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                maxDate={Today}
                selected={reportDateOn}
                required
                customInput={<CustomCalInput inputRef={inputRef} />}
                onChange={(selectedDate) => onChangeReportDateOn(selectedDate)}
                popperPlacement="top"
              />
            </Box>
            <Flex
              padding="30px 20px 10px 20px"
              justifyContent="center"
              position="relative"
              top="20px"
            >
              <Button
                type="submit"
                fontSize="1.4rem"
                fontWeight="600"
                lineHeight="1.5"
                position="relative"
                display="inline-block"
                padding="5px 40%"
                cursor="pointer"
                textAlign="center"
                borderRadius="0.5rem"
                backgroundColor="#fff"
                border="1px solid rgb(100, 100, 100)"
                backgroundColorOnhovered=" rgb(246, 208, 66)"
              >
                登 録
              </Button>
            </Flex>
          </form>
        </Flex>
        <Flex
          flexDirection="column"
          position="absolute"
          left="40%"
          top="10px"
          width="50%"
        >
          <Box padding="10px 0px" height="90vh">
            {dailyReports.length === 0 ? (
              <Flex
                color="rgb(140, 140, 140)"
                height="80%"
                fontSize="30px"
                justifyContent="center"
                alignItems="center"
              >
                日報を作成してください。
              </Flex>
            ) : (
              <>
                <Title>
                  総学習: {combinedTime} {combinedTime > 1 ? ' hrs' : '  hr'}
                </Title>
                {dailyReports.map((dailyReport) => (
                  <div key={dailyReport.id}>
                    {editedDailyReport.id === dailyReport.id ? (
                      <form onSubmit={() => onEditReport(editedDailyReport)}>
                        <Textarea
                          value={editedDailyReport.text}
                          inputRef={editInputRef}
                          onChange={(e) =>
                            onChangeEditInput('text', e.target.value)
                          }
                          position="relative"
                          required
                          padding="15px"
                          height="28vh"
                          resize="none"
                          width="100%"
                          border="1px solid rgb(246, 208, 66)"
                          fontSize="20px"
                          backgroundColor="rgb(250, 250, 250)"
                          borderOnFocused="1px solid rgb(62, 244, 4)"
                          outline="none"
                        />
                        <Flex
                          justifyContent="space-between"
                          width="70%"
                          color="rgb(120, 120, 120)"
                        >
                          <Flex alignItems="center" fontSize="20px">
                            <FaRegClock />
                            <Box margin="0px 5px 0px 5px">
                              <Input
                                fontSize="20px"
                                border="1px solid rgb(246, 208, 66)"
                                borderOnFocused="1px solid rgb(62, 244, 4)"
                                backgroundColor="rgb(250, 250, 250)"
                                padding="0px 0px 0px 10px"
                                type="number"
                                name="time"
                                step="0.1"
                                min="0.1"
                                max="24"
                                onChange={(e) =>
                                  onChangeEditInput('time', e.target.value)
                                }
                                placeholder="時間"
                                value={editedDailyReport.time}
                                outline="none"
                                required
                              />
                            </Box>
                          </Flex>
                          <Flex alignItems="center">
                            <FaRegCalendarAlt />
                            <Box margin="0px 5px 0px 5px">
                              <DatePicker
                                dateFormat="yyyy-MM-dd"
                                maxDate={Today}
                                selected={editReportDateOn}
                                required
                                customInput={
                                  <CustomEditCalInput inputRef={inputRef} />
                                }
                                onChange={(selectedDate) =>
                                  onChangeEditReportDateOn(selectedDate)
                                }
                              />
                            </Box>
                          </Flex>

                          <Button
                            type="submit"
                            fontSize="1rem"
                            fontWeight="600"
                            position="relative"
                            display="inline-block"
                            cursor="pointer"
                            textAlign="center"
                            borderRadius="0.5rem"
                            backgroundColor="#fff"
                            border="1px solid rgb(100, 100, 100)"
                            backgroundColorOnhovered=" rgb(246, 208, 66)"
                          >
                            確 定
                          </Button>
                        </Flex>
                      </form>
                    ) : (
                      <Flex padding="10px 0px">
                        <Box
                          position="relative"
                          padding="15px"
                          height="30vh"
                          width="100%"
                          border="1px solid rgb(200, 200, 200)"
                          fontSize="20px"
                          whiteSpace="pre-line"
                        >
                          <Box
                            height="85%"
                            wordBreak="break-all"
                            overflow="auto"
                          >
                            {dailyReport.text}
                          </Box>
                          <Flex
                            position="absolute"
                            top="85%"
                            width="100%"
                            justifyContent="space-between"
                            color="rgb(120, 120, 120)"
                          >
                            <Flex
                              position="absolute"
                              alignItems="center"
                              width="120px"
                            >
                              <FaRegClock />
                              <Box
                                margin="0px 5px 0px 5px"
                                color="rgb(120, 120, 120)"
                              >
                                {dailyReport.time}
                                {dailyReport.time > 1 ? ' hrs' : '  hr'}
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
                              {dailyReport.reportDateOn}
                            </Flex>
                            <Box
                              cursor="pointer"
                              position="absolute"
                              left="90%"
                              colorOnHovered="red"
                              color="rgb(120, 120, 120)"
                              onClick={() => onDeleteReport(dailyReport.id)}
                            >
                              <FaTrashAlt />
                            </Box>
                            <Box
                              cursor="pointer"
                              position="absolute"
                              left="63%"
                              color="rgb(120, 120, 120)"
                              colorOnHovered="rgb(246, 208, 66)"
                              onClick={() => onEditReportInput(dailyReport)}
                            >
                              <FaRegEdit />
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>
                    )}
                  </div>
                ))}
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
