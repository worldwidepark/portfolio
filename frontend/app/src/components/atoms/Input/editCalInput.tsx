import React, { forwardRef, useEffect, useState } from 'react'

interface InputProps {
  className: string
  value: string
  onChange: (value: string) => void
  onClick: () => void
  isBorderRadius?: boolean
}

// styled componentsだとDatePickerのカスタムinputが効かなかったので、別途作成
const EditCalInput = (
  { className, value, onClick, onChange, isBorderRadius = false }: InputProps,
  ref: any
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [borderRadius, setBorderRadius] = useState<string>('0')

  useEffect(() => {
    if (isBorderRadius) {
      setBorderRadius('0.4em')
    }
  })
  return (
    <input
      className={className}
      style={{
        width: '100%',
        padding: '3px 0px 0px 15px',
        border: isFocused
          ? '1px solid rgb(62, 244, 4)'
          : '1px solid rgb(246, 208, 66)',
        fontSize: '20px',
        borderRadius: borderRadius,
        backgroundColor: 'rgb(250,250,250)',
        outline: 'none',
      }}
      value={value}
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}

export default forwardRef(EditCalInput)
