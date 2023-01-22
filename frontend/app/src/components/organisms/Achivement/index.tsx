import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  deleteAchivement,
  editAchivement,
  getAchivementsList,
  postAchivement,
} from '../../../services/achivement/achivement'
import { AuthContext } from '../../../contexts/AuthContext'
import { Flex } from '../../layout/Flex'

export const AchivementsList = () => {
  const [achivements, setAchivements] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedId, setEditedId] = useState(false)
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
    console.log(updatedAchivementArray, 'arry')
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const postAndGet = async () => {
      await postAchivement(userId, data)
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
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
          <input type="text" name="url" placeholder="urlを記入してください。" />
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
                      ref={editInputRef}
                      onChange={(e) =>
                        onChangeEditInput('text', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={achivement.url}
                      ref={editInputRef}
                      onChange={(e) => onChangeEditInput('url', e.target.value)}
                    />
                    <button onClick={() => onEditReport(achivement)}>
                      edit
                    </button>
                  </>
                ) : (
                  <>
                    <div>{achivement.title}</div>
                    <div>{achivement.text}</div>
                    <div>{achivement.url}</div>
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
