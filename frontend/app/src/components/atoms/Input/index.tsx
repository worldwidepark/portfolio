import React, { forwardRef } from 'react'

interface InputProps {
  className: string
  value: string
  onChange: (value: string) => void
  onClick: () => void
}

const CalInput = ({ className, value, onClick, onChange }: InputProps, ref) => {
  return (
    <input
      className={className}
      style={{
        width: '100%',
        height: '35px',
        padding: '3px 0px 0px 15px',
        border: '1px solid rgb(62, 244, 4)',
        fontSize: '20px',
        borderRadius: '0.4em',
        backgroundColor: 'rgb(250,250,250)',
      }}
      value={value}
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  )
}

export default forwardRef(CalInput)
