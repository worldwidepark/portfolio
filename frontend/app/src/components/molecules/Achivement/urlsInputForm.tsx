import React, { useContext, useState } from 'react'

export const UrlsInputForm = ({ makeUrls, urlValue, inputData }) => {
  const [secondInput, setSecondInput] = useState(false)
  const onAddUrlInput = () => {
    setSecondInput(true)
  }
  const onDeleteInput = () => {
    setSecondInput(false)
  }

  return (
    <>
      <input
        value={inputData.urls[0]}
        name="firstUrl"
        onChange={(e) => urlValue('firstUrl', e.target.value)}
        placeholder="URLを入力してください。"
      />
      {secondInput ? (
        <>
          <input
            value={inputData.urls[1]}
            name="secondUrl"
            onChange={(e) => urlValue('secondUrl', e.target.value)}
            placeholder="URLを入力してください。"
          />
          <button onClick={onDeleteInput}>-</button>
        </>
      ) : (
        <>
          <button onClick={onAddUrlInput}>+</button>
        </>
      )}
    </>
  )
}
