import React, { useEffect, useState } from 'react'

export const UrlsInputForms = ({ onChangeUrl, achivement, setAchivement }) => {
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
