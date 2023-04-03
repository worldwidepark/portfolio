import React, { useEffect, useState } from 'react'
import { UserProfileType, UserProfileUrlType } from '../../../types/types'

interface UrlsInputFormsType {
  onChangeUrl: (key: string, value: string) => void
  editedUserProfileData: UserProfileType
}

export const UrlsInputForms = ({
  onChangeUrl,
  editedUserProfileData,
}: UrlsInputFormsType) => {
  const [editedUrl, setEditedUrl] = useState<UserProfileUrlType>({
    url: '',
    selected: '',
  })

  useEffect(() => {
    if (editedUserProfileData.url) {
      setEditedUrl(editedUserProfileData.url)
    }
  }, [editedUserProfileData.url])

  const onChangeEditedUrl = (key: string, value: string) => {
    setEditedUrl({ ...editedUrl, [key]: value })
    onChangeUrl(key, value)
  }

  return (
    <>
      <div>
        <label htmlFor="url-select">外部サービスURL:</label>
        <select
          value={editedUrl.selected}
          onChange={(e) => onChangeEditedUrl('selected', e.target.value)}
          id="url-select"
        >
          <option value="" selected disabled>
            -URLの種類を選んでください。-
          </option>
          <option value="twitter">Twitter</option>
          <option value="gitHub">GitHub</option>
          <option value="blog">Blog</option>
          <option value="homepage">Homepage</option>
        </select>
        <input
          name="url"
          type="url"
          value={editedUrl.url}
          onChange={(e) => onChangeEditedUrl('url', e.target.value)}
          placeholder="URLを入力してください。"
        />
      </div>
    </>
  )
}
