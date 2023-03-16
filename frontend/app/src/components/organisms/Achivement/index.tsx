import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  deleteAchivement,
  editAchivement,
  getAchivementsList,
  postAchivement,
} from '../../../services/achivement/achivement'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'
import { UrlsInputForm } from './urlsInputForm'
import { type } from 'os'
import { EditUrlsInputForm } from './editUrlsInputForm'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { start } from 'repl'

export const AchivementsList = () => {
  const [achivements, setAchivements] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedAchivement, setEditedAchivement] = useState(false)
  // todo: 削除 inputText,setInputText
  const [inputText, setInputText] = useState({ title: '', text: '' })
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [editStartDate, setEditStartDate] = useState(new Date())
  const [editEndDate, setEditEndDate] = useState(null)
  const { currentUserId } = useContext(AuthContext)
  const Today = new Date()
  const [inputData, setInputData] = useState({
    title: '',
    text: '',
  })
  const editInputRef = useRef(null)

  useEffect(() => {
    setUserId(currentUserId)
    console.log(currentUserId, 'current')
  }, [currentUserId])

  useEffect(() => {
    console.log(typeof userId, 'userId')
    if (typeof userId == 'number') {
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
      })
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (editedAchivement) {
      editInputRef.current.focus()
      console.log(editInputRef.current)
    }
  }, [editedAchivement.id])

  const onChangeEditInput = (key, value) => {
    setEditedAchivement({ ...editedAchivement, [key]: value })
  }

  const updateAchivements = (updatedAchivementData) => {
    const updatedAchivementArray = achivements.map((achivement) => {
      if (achivement.id === updatedAchivementData.id) {
        return updatedAchivementData
      } else {
        return achivement
      }
    })
    setAchivements(updatedAchivementArray)
  }

  // todo fetch update.
  const onEditAchivement = (achivement) => {
    editAchivement(userId, achivement, editStartDate, editEndDate).then(
      (achivementsData) => {
        updateAchivements(achivementsData)
      }
    )
    setEditedAchivement(false)
  }
  const onChangeDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const onEditChangeDate = (dates) => {
    const [start, end] = dates
    setEditStartDate(start)
    setEditEndDate(end)
  }

  const onChangeInputData = (key, value) => {
    setInputData({ ...inputData, [key]: value })
  }

  const urls = (firstUrl, secondUrl) => {
    if (firstUrl !== '' && secondUrl !== '' && typeof secondUrl == 'string') {
      return [firstUrl, secondUrl]
    } else if (firstUrl !== '') {
      return [firstUrl]
    } else if (secondUrl !== '') {
      return [secondUrl]
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    postAchivement(
      userId,
      data,
      // todo:いきなりfirstUrl,secondUrlが出てくるので分かりにくいので、直す
      // page/achivementの方で管理すべきだと思う。
      urls(data.get('firstUrl'), data.get('secondUrl')),
      startDate,
      endDate
    ).then((achivementsData) => {
      setAchivements([...achivements, achivementsData])
    })

    setInputData({
      title: '',
      text: '',
    })
    setStartDate(new Date())
    setEndDate(null)
  }

  const onDeleteAchivement = (achivementId) => {
    const deleteAndGet = async () => {
      await deleteAchivement(userId, achivementId)
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
      })
    }
    deleteAndGet()
  }
  const onEditAchivementInput = (achivement) => {
    setEditedAchivement(achivement)
    setEditStartDate(new Date(achivement.startDateOn))
    setEditEndDate(new Date(achivement.endDateOn))
  }
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
          {/* todo +ボタンでurlが追加できるようにする。 */}
          <UrlsInputForm />
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
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
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
                    <EditUrlsInputForm
                      achivement={achivement}
                      onChangeEditInput={onChangeEditInput}
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
        )}
      </Flex>
    </>
  )
}
