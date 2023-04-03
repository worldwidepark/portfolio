import React, { useEffect, useState } from 'react'
import { AchivementType } from '../../../types/types'
interface UrlsInputFormsType {
  onChangeUrl: (
    name: string,
    value: string,
    data: AchivementType,
    setData: React.Dispatch<React.SetStateAction<AchivementType>>,
    achivementLength: number
  ) => void
  achivement: any
  setAchivement: React.Dispatch<React.SetStateAction<any>>
}

export const UrlsInputForms = ({
  onChangeUrl,
  achivement,
  setAchivement,
}: UrlsInputFormsType) => {
  const [achivementLength, setAchivementLength] = useState(1)

  useEffect(() => {
    setAchivementLength(achivement.urls.length)
  }, [achivement])

  const onAddUrlInput = () => {
    setAchivementLength(2)
  }
  const onDeleteInput = () => {
    setAchivement({
      ...achivement,
      urls: [achivement.urls[0]],
    })
  }

  return (
    <>
      <input
        name="firstUrl"
        type="url"
        value={achivement.urls[0]}
        onChange={(e) =>
          onChangeUrl(
            'firstUrl',
            e.target.value,
            achivement,
            setAchivement,
            achivementLength
          )
        }
        placeholder="URLを入力してください。"
      />

      {achivementLength === 2 ? (
        <>
          <input
            name="secondUrl"
            type="url"
            value={achivement.urls[1]}
            onChange={(e) =>
              onChangeUrl(
                'secondUrl',
                e.target.value,
                achivement,
                setAchivement,
                achivementLength
              )
            }
            placeholder="URLを入力してください。"
          />
          <button type="button" onClick={onDeleteInput}>
            -
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={onAddUrlInput}>
            +
          </button>
        </>
      )}
    </>
  )
}
