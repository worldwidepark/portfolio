import React, { forwardRef, useContext, useRef } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DailyReportType } from '../../../types/types'
import styled from 'styled-components'
import Input from '../../atoms/Input'
import { Box } from '../../layout/Box'
import { FaBookOpen, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'

interface DailyReportListType {
  combinedTime: number
  dailyReports: DailyReportType[]
  editInputRef: React.RefObject<HTMLInputElement>
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
  onChangeReportDateOn: (selectedDate) => void
  Today: Date
}
const DailyreportTextarea = styled.textarea`
  padding: 15px;
  height: 20vh;
  resize: none;
  width: 100%;
  border: 1px solid rgb(62, 244, 4);
  border-radius: 0.4em;
  font-size: 20px;
  background-color: rgb(250, 250, 250);
  &:focus {
    border-color: rgb(246, 208, 66);
    outline: none;
  }
`
const DailyreportInput = styled.input`
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border: 1px solid rgb(62, 244, 4);
  border-radius: 0.4em;
  font-size: 20px;
  background-color: rgb(250, 250, 250);
  &:focus {
    border-color: rgb(246, 208, 66);
    outline: none;
  }
`

const LabelStyle = styled.div`
  padding: 5px;
  font-size: 25px;
  color: rgb(15, 0, 65);
`
const Title = styled.div`
  font-size: 1.8em;
  padding: 5px 0px
  line-height: 0.95em;
  font-weight: bold;
  text-shadow: 0 0.03em 0.03em #ffab91, 0 0.03em 0.03em #000,
    0 0.03em 0.03em #fbe9e7;
`
const Button = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 5px 40%;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.5rem;
  background-color: #fff;
  border: 1px solid rgb(100, 100, 100);
  &:hover {
    background-color: rgb(246, 208, 66);
  }
`

const CustomInput = forwardRef((props: any, ref) => {
  return <Input {...props} ref={ref} />
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
          textShadow="0 0 0.2em rgba(255,255,255,1)"
        >
          <Title>
            <Box>今日のあなたの頑張りを</Box>
            <Box textAlign="right">教えてください！</Box>
          </Title>
          <form onSubmit={handleSubmit}>
            <Box padding="10px 20px 10px 20px">
              <LabelStyle>
                <FaBookOpen />
              </LabelStyle>
              <DailyreportTextarea
                name="text"
                value={inputData.text}
                onChange={(e) => onChangeInputData('text', e.target.value)}
                placeholder="日報を記入してください。"
                required
              ></DailyreportTextarea>
            </Box>
            <Box padding="10px 20px 10px 20px">
              <LabelStyle>
                <FaRegClock />
              </LabelStyle>
              <DailyreportInput
                type="number"
                name="time"
                step="0.1"
                min="0"
                max="24"
                value={inputData.time}
                onChange={(e) => onChangeInputData('time', e.target.value)}
                placeholder="時間を記入してください。"
                required
              />
            </Box>
            <Box padding="10px 20px 10px 20px">
              <LabelStyle>
                <FaRegCalendarAlt />
              </LabelStyle>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                maxDate={Today}
                selected={reportDateOn}
                required
                customInput={<CustomInput inputRef={inputRef} />}
                onChange={(selectedDate) => onChangeReportDateOn(selectedDate)}
              />
            </Box>
            <Flex
              padding="30px 20px 10px 20px"
              justifyContent="center"
              position="relative"
              top="20px"
            >
              <Button type="submit">登 録</Button>
            </Flex>
          </form>
        </Flex>
        <Flex flexDirection="column" position="absolute" left="40%" top="10px">
          <>
            <div>総学習時間:{combinedTime}</div>
            {dailyReports.map((dailyReport) => (
              <div key={dailyReport.id}>
                {editedDailyReport.id === dailyReport.id ? (
                  <form onSubmit={() => onEditReport(editedDailyReport)}>
                    <input
                      type="text"
                      value={editedDailyReport.text}
                      ref={editInputRef}
                      onChange={(e) =>
                        onChangeEditInput('text', e.target.value)
                      }
                    />
                    <input
                      type="number"
                      name="time"
                      step="0.1"
                      min="0"
                      max="24"
                      onChange={(e) =>
                        onChangeEditInput('time', e.target.value)
                      }
                      placeholder="時間を記入してください。"
                      value={editedDailyReport.time}
                      required
                    />
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      maxDate={Today}
                      selected={editReportDateOn}
                      required
                      onChange={(selectedDate) =>
                        onChangeEditReportDateOn(selectedDate)
                      }
                    />
                    <button type="submit">edit</button>
                  </form>
                ) : (
                  <>
                    <div>{dailyReport.text}</div>
                    <div>{dailyReport.time}</div>
                    <div>{dailyReport.reportDateOn}</div>
                    <button onClick={() => onDeleteReport(dailyReport.id)}>
                      x
                    </button>
                    <button onClick={() => onEditReportInput(dailyReport)}>
                      edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </>
        </Flex>
      </Flex>
    </>
  )
}
