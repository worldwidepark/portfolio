import React, { useEffect, useState } from 'react'

export const UrlsInputForms = ({
  onChangeUrl,
  editedUserProfileData,
  setEditedUserProfileData,
}) => {
  const [editedUrl, setEditedUrl] = useState({ url: '', selected: '' })

  useEffect(() => {
    console.log(editedUserProfileData.url)
    if (editedUserProfileData.url) {
      setEditedUrl(editedUserProfileData.url)
    }
  }, [editedUserProfileData.url])

  const onChangeEditedUrl = (key, value) => {
    setEditedUrl({ ...editedUrl, [key]: value })
    onChangeUrl(key, value)
    console.log(editedUrl)
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
