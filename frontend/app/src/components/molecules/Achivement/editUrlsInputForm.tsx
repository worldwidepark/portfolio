import React, { useContext, useEffect, useState } from 'react'

export const EditUrlsInputForm = ({ achivement, onChangeEditInput }) => {
  const [achivementLength, setAchivementLength] = useState(1)
  const onAddUrlInput = () => {
    setAchivementLength(2)
  }
  useEffect(() => {
    setAchivementLength(achivement.urls.length)
  }, [])

  const urlValue = (name, value) => {
    if (name === 'firstUrl') {
      achivement.urls[0] = value
    } else if (name === 'secondUrl') {
      achivement.urls[1] = value
    }
    return achivement.urls
  }

  return (
    <>
      <input
        name="firstUrl"
        value={achivement.urls[0]}
        onChange={(e) =>
          onChangeEditInput('urls', urlValue('firstUrl', e.target.value))
        }
      />

      {achivementLength === 2 ? (
        <>
          <input
            name="secondUrl"
            value={achivement.urls[1]}
            onChange={(e) =>
              onChangeEditInput('urls', urlValue('secondUrl', e.target.value))
            }
          />
        </>
      ) : (
        <>
          <button onClick={onAddUrlInput}>+</button>
        </>
      )}
    </>
  )
}
