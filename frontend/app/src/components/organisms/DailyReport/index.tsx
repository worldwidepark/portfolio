import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export const DailyReportsList = ({
  combinedTime,
  dailyReports,
  editInputRef,
  editedDailyReport,
  editReportDateOn,
  handleSubmit,
  inputData,
  loading,
  onChangeEditInput,
  onChangeInputData,
  onDeleteReport,
  onEditReport,
  onEditReportInput,
  reportDateOn,
  setEditReportDateOn,
  setReportDateOn,
  Today,
}) => {
  return (
    <>
      <div>総学習時間:</div>
      {combinedTime}
      <form onSubmit={handleSubmit}>
        <div>
          {/* todo: 初期focusを当てたい */}
          {/* todo: labelをつける */}
          <input
            type="text"
            name="text"
            value={inputData.text}
            onChange={(e) => onChangeInputData('text', e.target.value)}
            placeholder="日報を記入してください。"
            required
          />
        </div>
        <div>
          <input
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
        </div>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          maxDate={Today}
          selected={reportDateOn}
          required
          onChange={(selectedDate) => {
            setReportDateOn(selectedDate)
          }}
        />
        <button type="submit">登録</button>
      </form>
      <Flex flexDirection="column">
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
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
                      onChange={(selectedDate) => {
                        setEditReportDateOn(selectedDate)
                      }}
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
        )}
      </Flex>
    </>
  )
}
