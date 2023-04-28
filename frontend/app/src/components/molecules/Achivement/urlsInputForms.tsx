import React, { useEffect, useState } from 'react'
import { AchivementType } from '../../../types/types'
import { Input } from '../../atoms/Input'
import { Button } from '../../atoms/Button'
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
  isEdited?: boolean
}

export const UrlsInputForms = ({
  onChangeUrl,
  achivement,
  setAchivement,
  isEdited = false,
}: UrlsInputFormsType) => {
  const [achivementLength, setAchivementLength] = useState(1)
  const [border, setBorder] = useState('1px solid rgb(62, 244, 4)')
  const [borderOnFocused, setBorderOnFocused] = useState(
    '1px solid rgb(246, 208, 66)'
  )

  useEffect(() => {
    if (achivement.urls.length === 0) {
      setAchivementLength(1)
    } else {
      setAchivementLength(achivement.urls.length)
    }
  }, [achivement])

  useEffect(() => {
    if (isEdited) {
      setBorder('1px solid rgb(246, 208, 66)')
      setBorderOnFocused('1px solid rgb(62, 244, 4)')
    }
  })

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
      <Input
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
        width="88%"
        height="25px"
        margin="3px"
        paddingLeft="15px"
        border={border}
        borderRadius="0.4em"
        borderOnFocused={borderOnFocused}
        fontSize="13px"
        backgroundColor="rgb(250, 250, 250)"
        outline="none"
      />

      {achivementLength === 2 ? (
        <>
          <Input
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
            width="88%"
            height="25px"
            paddingLeft="15px"
            margin="3px"
            border={border}
            borderRadius="0.4em"
            borderOnFocused={borderOnFocused}
            fontSize="13px"
            backgroundColor="rgb(250, 250, 250)"
            outline="none"
          />
          <Button
            type="button"
            onClick={onDeleteInput}
            fontSize="1rem"
            fontWeight="600"
            lineHeight="1.5"
            position="relative"
            left="10px"
            display="inline-block"
            cursor="pointer"
            textAlign="center"
            borderRadius="3rem"
            backgroundColor="#fff"
            border="1px solid rgb(100, 100, 100)"
            backgroundColorOnhovered=" rgb(246, 208, 66)"
            width="8%"
          >
            -
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            onClick={onAddUrlInput}
            fontSize="1rem"
            fontWeight="600"
            lineHeight="1.5"
            position="relative"
            left="10px"
            display="inline-block"
            cursor="pointer"
            textAlign="center"
            borderRadius="3rem"
            backgroundColor="#fff"
            border="1px solid rgb(100, 100, 100)"
            backgroundColorOnhovered=" rgb(246, 208, 66)"
            width="8%"
          >
            +
          </Button>
        </>
      )}
    </>
  )
}
