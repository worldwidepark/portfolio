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

export const AchivementsList = () => {
  const [achivements, setAchivements] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedId, setEditedId] = useState(false)
  const [secondInput, setSecondInput] = useState(false)
  const { currentUserId } = useContext(AuthContext)

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
    if (editedId) {
      editInputRef.current.focus()
      console.log(editInputRef.current)
    }
  }, [editedId])
  const getEditedAchivement = () => {
    return achivements.find((achivement) => achivement.id === editedId)
  }
  const onChangeEditInput = (key, value) => {
    const editAchivement = getEditedAchivement()
    const onUpdateAchivement = { ...editAchivement, [key]: value }
    const updatedAchivementArray = achivements.map((achivement) => {
      if (achivement.id === onUpdateAchivement.id) {
        return onUpdateAchivement
      } else {
        return achivement
      }
    })
    setAchivements(updatedAchivementArray)
  }
  // todo fetch update.
  const onEditReport = (achivement) => {
    const editAndGet = async () => {
      await editAchivement(userId, achivement)
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
      })
    }
    setEditedId(false)
    editAndGet()
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
    const postAndGet = async () => {
      await postAchivement(
        userId,
        data,
        urls(data.get('firstUrl'), data.get('secondUrl'))
      )
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
        console.log(achivementsData)
      })
    }
    postAndGet()
  }
  const onDeleteReport = (reportId) => {
    const deleteAndGet = async () => {
      await deleteAchivement(userId, reportId)
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
      })
    }
    deleteAndGet()
  }
  // todo: useRefを使う
  const onEditReportInput = (reportId) => {
    setEditedId(reportId)
  }
  const onAddUrlInput = () => {
    setSecondInput(true)
  }

  const urlValue = (name, value, achivement) => {
    if (name === 'firstUrl') {
      achivement.urls[0] = value
    } else if (name === 'secondUrl') {
      achivement.urls[1] = value
    }
    return achivement.urls
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* todo: 初期focusを当てたい */}
          <input
            type="text"
            name="title"
            placeholder="題名を記入してください。"
          />
          <input
            type="text"
            name="text"
            placeholder="内容を記入してください。"
          />
          {/* todo +ボタンでurlが追加できるようにする。 */}
          <UrlsInputForm />
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
                {editedId === achivement.id ? (
                  <>
                    <input
                      type="text"
                      value={achivement.title}
                      ref={editInputRef}
                      onChange={(e) =>
                        onChangeEditInput('title', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={achivement.text}
                      onChange={(e) =>
                        onChangeEditInput('text', e.target.value)
                      }
                    />
                    <EditUrlsInputForm
                      achivement={achivement}
                      onChangeEditInput={onChangeEditInput}
                    />
                    {/* <input
                      type="text"
                      value={achivement.urls}
                      onChange={(e) => onChangeEditInput('url', e.target.value)}
                    /> */}
                    <button onClick={() => onEditReport(achivement)}>
                      edit
                    </button>
                  </>
                ) : (
                  <>
                    <div>{achivement.title}</div>
                    <div>{achivement.text}</div>
                    {achivement.urls.map((url) => url)}
                    <button onClick={() => onDeleteReport(achivement.id)}>
                      x
                    </button>
                    <button onClick={() => onEditReportInput(achivement.id)}>
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
function elseif() {
  throw new Error('Function not implemented.')
}
