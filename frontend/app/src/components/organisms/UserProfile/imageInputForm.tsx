import React, { useState } from 'react'
import { UserProfileType } from '../../../types/types'

interface ImageInputFormProps {
  isCurrentUser: boolean
  userProfileData: UserProfileType
  onSubmitUserProfileImage: (e: any) => void
  preview: string | boolean
  onChangeFile: (e: any) => void
  onEditImage: boolean
  setOnEditImage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImageInputForm = ({
  isCurrentUser,
  userProfileData,
  onSubmitUserProfileImage,
  preview,
  onChangeFile,
  onEditImage,
  setOnEditImage,
}: ImageInputFormProps) => {
  return (
    <>
      {onEditImage ? (
        <form onSubmit={onSubmitUserProfileImage}>
          {typeof preview === 'string' ? (
            <img src={preview} />
          ) : (
            <img src={userProfileData.image} />
          )}
          <input
            name="image"
            type="file"
            onChange={onChangeFile}
            accept="image/*"
          />
          <button type="submit">編集</button>
        </form>
      ) : (
        <div>
          <img src={userProfileData.image} />
          {isCurrentUser && (
            <button
              type="button"
              onClick={() => {
                setOnEditImage(true)
              }}
            >
              プロフィール写真を編集
            </button>
          )}
        </div>
      )}
    </>
  )
}
