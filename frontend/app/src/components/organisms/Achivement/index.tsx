import React from 'react'
import { Flex } from '../../layout/Flex'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { UrlsInputForms } from '../../molecules/Achivement/urlsInputForms'
import { AchivementType } from '../../../types/types'

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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* todo: 初期focusを当てたい */}
          <input
            type="text"
            name="title"
            value={inputData.title}
            onChange={(e) => onChangeInputData('title', e.target.value)}
            placeholder="題名を記入してください。"
            required
          />
          <input
            type="text"
            name="text"
            value={inputData.text}
            onChange={(e) => onChangeInputData('text', e.target.value)}
            placeholder="内容を記入してください。"
            required
          />
          <UrlsInputForms
            onChangeUrl={onChangeUrl}
            achivement={inputData}
            setAchivement={setInputData}
          />
          <DatePicker
            dateFormat="yyyy/MM/dd"
            maxDate={Today}
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <Flex flexDirection="column">
        <>
          {achivements.map((achivement) => (
            <div key={achivement.id}>
              {editedAchivement.id === achivement.id ? (
                <form onSubmit={() => onEditAchivement(editedAchivement)}>
                  <input
                    type="text"
                    value={editedAchivement.title}
                    ref={editInputRef}
                    onChange={(e) => onChangeEditInput('title', e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedAchivement.text}
                    onChange={(e) => onChangeEditInput('text', e.target.value)}
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
                <>
                  <div>{achivement.title}</div>
                  <div>{achivement.text}</div>
                  {achivement.urls.map((url) => (
                    <div>{url}</div>
                  ))}
                  <div>{achivement.startDateOn}</div>
                  <div>{achivement.endDateOn}</div>
                  <button onClick={() => onDeleteAchivement(achivement.id)}>
                    x
                  </button>
                  <button onClick={() => onEditAchivementInput(achivement)}>
                    edit
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      </Flex>
    </>
  )
}
