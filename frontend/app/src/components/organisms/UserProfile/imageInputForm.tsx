import React, { useState } from 'react'

export const ImageInputForm = ({
  isCurrentUser,
  userProfileData,
  onSubmitUserProfileImage,
  preview,
  onChangeFile,
  onEditImage,
  setOnEditImage,
}) => {
  return (
    <>
      {onEditImage ? (
        <form onSubmit={onSubmitUserProfileImage}>
          {preview ? (
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
              onClick={(e) => {
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
