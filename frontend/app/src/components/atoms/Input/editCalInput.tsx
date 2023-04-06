import React, { forwardRef, useState } from 'react'

interface InputProps {
  className: string
  value: string
  onChange: (value: string) => void
  onClick: () => void
}

// styled componentsだとDatePickerのカスタムinputが効かなかったので、別途作成
const EditCalInput = (
  { className, value, onClick, onChange }: InputProps,
  ref
) => {
  return (
    <input
      className={className}
      style={{
        width: '100%',
        padding: '3px 0px 0px 15px',
        border: '1px solid rgb(246, 208, 66)',
        fontSize: '20px',
        backgroundColor: 'rgb(250,250,250)',
      }}
      value={value}
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  )
}

export default forwardRef(EditCalInput)
