import React, { useContext, useState } from 'react'

export const UrlsInputForm = () => {
  const [secondInput, setSecondInput] = useState(false)
  const onAddUrlInput = () => {
    setSecondInput(true)
  }
  const onDeleteInput = () => {
    setSecondInput(false)
  }
  const UrlInput = ({ name }) => {
    return (
      <input type="text" name={name} placeholder="Urlを記入してください。" />
    )
  }
  return (
    <>
      <UrlInput name="firstUrl" />
      {secondInput ? (
        <>
          <UrlInput name="secondUrl" />
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
