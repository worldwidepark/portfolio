import React, { useState } from 'react'
import { UserProfileType } from '../../../types/types'
import styled from 'styled-components'
import { Flex } from '../../layout/Flex'
import { Box } from '../../layout/Box'

interface ImageInputFormProps {
  isCurrentUser: boolean
  userProfileData: UserProfileType
  onSubmitUserProfileImage: (e: any) => void
  preview: string | boolean
  onChangeFile: (e: any) => void
  onEditImage: boolean
  setOnEditImage: React.Dispatch<React.SetStateAction<boolean>>
  setPreview: React.Dispatch<React.SetStateAction<string | boolean>>
}
const Img = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
  object-fit: cover;
  margin-bottom: 20px;
`

export const ImageInputForm = ({
  isCurrentUser,
  userProfileData,
  onSubmitUserProfileImage,
  preview,
  onChangeFile,
  onEditImage,
  setOnEditImage,
  setPreview,
}: ImageInputFormProps) => {
  return (
    <>
      {onEditImage ? (
        <form onSubmit={onSubmitUserProfileImage}>
          <Flex flexDirection="column" alignItems="center">
            {typeof preview === 'string' ? (
              <>
                <Img src={preview} />
                <button type="submit">編集</button>
              </>
            ) : (
              <Img src={userProfileData.image} />
            )}
            <input
              name="image"
              type="file"
              onChange={onChangeFile}
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => {
                setOnEditImage(false)
                setPreview(false)
              }}
            >
              編集を取り消す
            </button>
          </Flex>
        </form>
      ) : (
        <Flex flexDirection="column" alignItems="center">
          <Img src={userProfileData.image} />
          {isCurrentUser && (
            <Box height="100px">
              <button
                type="button"
                onClick={() => {
                  setOnEditImage(true)
                }}
              >
                プロフィール写真を編集
              </button>
            </Box>
          )}
        </Flex>
      )}
    </>
  )
}
