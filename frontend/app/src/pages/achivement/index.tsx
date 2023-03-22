import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  deleteAchivement,
  editAchivement,
  getAchivementsList,
  postAchivement,
} from '../../services/achivement/achivement'
import { Flex } from '../../components/layout/Flex'
import { AchivementsList } from '../../components/organisms/Achivement'
import { Sidebar } from '../../components/organisms/Sidebar'
import Layout from '../../components/templates/Layout'
import { AuthContext } from '../../contexts/AuthContext'

const achivement = () => {
  const [achivements, setAchivements] = useState([])
  const [userId, setUserId] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editedAchivement, setEditedAchivement] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [editStartDate, setEditStartDate] = useState(new Date())
  const [editEndDate, setEditEndDate] = useState(null)
  const { currentUserId } = useContext(AuthContext)
  const Today = new Date()
  const [inputData, setInputData] = useState({
    title: '',
    text: '',
    urls: [''],
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

  const onEditAchivement = (achivement) => {
    editAchivement(
      userId,
      achivement,
      deleteUrlsEmpty(achivement.urls),
      editStartDate,
      editEndDate
    ).then((achivementsData) => {
      updateAchivements(achivementsData)
    })
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

  const deleteUrlsEmpty = (urls) => {
    const firstUrl = urls[0]
    const secondUrl = urls[1]
    if (firstUrl !== '' && secondUrl !== '' && typeof secondUrl == 'string') {
      return [firstUrl, secondUrl]
    } else if (firstUrl !== '') {
      return [firstUrl]
    } else if (secondUrl !== '') {
      return [secondUrl]
    }
  }
  const onChangeUrl = (name, value, data, setData, achivementLength) => {
    if (name === 'firstUrl' && data.urls[1]) {
      setData({ ...data, urls: [value, data.urls[1]] })
    } else if (name == 'firstUrl' && achivementLength === 2) {
      setData({ ...data, urls: [value, ''] })
    } else if (name == 'firstUrl' && achivementLength === 1) {
      setData({ ...data, urls: [value] })
    } else if (name === 'secondUrl') {
      setData({ ...data, urls: [data.urls[0], value] })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    postAchivement(
      userId,
      data,
      deleteUrlsEmpty(inputData.urls),
      startDate,
      endDate
    ).then((achivementsData) => {
      setAchivements([...achivements, achivementsData])
    })

    setInputData({
      title: '',
      text: '',
      urls: [''],
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
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        {loading ? (
          <h1>ロード中。。</h1>
        ) : (
          <>
            {/* todo データがない時の対応 */}
            <AchivementsList
              achivements={achivements}
              editEndDate={editEndDate}
              editedAchivement={editedAchivement}
              editInputRef={editInputRef}
              editStartDate={editStartDate}
              endDate={endDate}
              handleSubmit={handleSubmit}
              inputData={inputData}
              loading={loading}
              onChangeDate={onChangeDate}
              onChangeEditInput={onChangeEditInput}
              onChangeInputData={onChangeInputData}
              onChangeUrl={onChangeUrl}
              onDeleteAchivement={onDeleteAchivement}
              onEditAchivement={onEditAchivement}
              onEditAchivementInput={onEditAchivementInput}
              onEditChangeDate={onEditChangeDate}
              setEditedAchivement={setEditedAchivement}
              setInputData={setInputData}
              startDate={startDate}
              Today={Today}
            />
          </>
        )}
      </Flex>
    </Layout>
  )
}

export default achivement
