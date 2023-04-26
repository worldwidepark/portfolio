import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  deleteAchivement,
  editAchivement,
  getAchivementsList,
  postAchivement,
} from '../../services/achivement/achivement'
import { Flex } from '../../components/layout/Flex'
import { AchivementsList } from '../../components/organisms/Achivement'
import Layout from '../../components/templates/Layout'
import { AuthContext } from '../../contexts/AuthContext'
import { AchivementType } from '../../types/types'
import { NextPage } from 'next/types'

const achivement: NextPage = () => {
  const [achivements, setAchivements] = useState<AchivementType[]>([])
  const [userId, setUserId] = useState<number | boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [editedAchivement, setEditedAchivement] = useState<AchivementType>({
    id: NaN,
    title: '',
    text: '',
    urls: [''],
  })
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [editStartDate, setEditStartDate] = useState<Date | null>(new Date())
  const [editEndDate, setEditEndDate] = useState<Date | null>(null)
  const { currentUserId } = useContext(AuthContext)
  const Today: Date = new Date()
  const [inputData, setInputData] = useState<{
    title: string
    text: string
    urls: string[]
  }>({
    title: '',
    text: '',
    urls: [''],
  })
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof currentUserId === 'number') {
      setUserId(currentUserId)
    }
  }, [currentUserId])

  useEffect(() => {
    if (typeof userId == 'number') {
      getAchivementsList(userId).then((achivementsData) => {
        setAchivements(achivementsData)
      })
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [editedAchivement.id])

  const onChangeEditInput = (key: string, value: any) => {
    setEditedAchivement({ ...editedAchivement, [key]: value })
  }

  const updateAchivements = (updatedAchivementData: AchivementType) => {
    const updatedAchivementArray = achivements.map((achivement) => {
      if (achivement.id === updatedAchivementData.id) {
        return updatedAchivementData
      } else {
        return achivement
      }
    })
    setAchivements(updatedAchivementArray)
  }

  const onEditAchivement = (achivement: AchivementType) => {
    if (typeof userId === 'number' && editStartDate && editEndDate) {
      editAchivement(
        userId,
        achivement,
        deleteUrlsEmpty(achivement.urls),
        editStartDate,
        editEndDate
      ).then((achivementsData) => {
        updateAchivements(achivementsData)
      })
      setEditedAchivement({ id: NaN, title: '', text: '', urls: [''] })
    }
  }
  const onChangeDate = (dates: Date[]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const onEditChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates

    setEditStartDate(start)
    setEditEndDate(end)
  }

  const onChangeInputData = (
    key: string,
    value: string | string[] | undefined
  ) => {
    setInputData({ ...inputData, [key]: value })
  }

  const deleteUrlsEmpty = (urls: string[]) => {
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
  const onChangeUrl = (
    name: string,
    value: string,
    data: AchivementType,
    setData: React.Dispatch<React.SetStateAction<AchivementType>>,
    achivementLength: number
  ) => {
    console.log(data)
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

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (typeof userId === 'number' && startDate && endDate) {
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
  }

  const onDeleteAchivement = (achivementId: number) => {
    const deleteAndGet = async () => {
      if (typeof userId === 'number') {
        await deleteAchivement(userId, achivementId)
        getAchivementsList(userId).then((achivementsData) => {
          setAchivements(achivementsData)
        })
      }
    }
    deleteAndGet()
  }
  const onEditAchivementInput = (achivement: AchivementType) => {
    setEditedAchivement(achivement)
    if (achivement.startDateOn && achivement.endDateOn) {
      setEditStartDate(new Date(achivement.startDateOn))
      setEditEndDate(new Date(achivement.endDateOn))
    }
  }

  return (
    <Layout>
      <Flex flexDirection="row">
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
