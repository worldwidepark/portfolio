import React, { ReactNode, useEffect, useState } from 'react'
import { UserProfileTagsType } from '../../../types/types'

interface SearchProgrammingLanguageTagsType {
  isCurrentUser: boolean
  programmingLanguageTags: UserProfileTagsType[]
  searchInput: string
  searchedResults: UserProfileTagsType[]
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
  onClickDeleteProgrammingLanguageTag: (tagId: number) => void
  onChangeProgrammingLanguageTags: (data: string) => void
  onSubmitProgrammingLanguageTags: (event: any) => void
}

export const SearchProgrammingLanguageTags = ({
  isCurrentUser,
  programmingLanguageTags,
  searchInput,
  searchedResults,
  setSearchInput,
  onClickDeleteProgrammingLanguageTag,
  onChangeProgrammingLanguageTags,
  onSubmitProgrammingLanguageTags,
}: SearchProgrammingLanguageTagsType) => {
  return (
    <>
      {isCurrentUser ? (
        <>
          {' '}
          <div>
            {programmingLanguageTags.map((tag) => {
              return (
                <>
                  <div key={tag.id}>{tag.name}</div>
                  <button
                    onClick={() => onClickDeleteProgrammingLanguageTag(tag.id)}
                  >
                    X
                  </button>
                </>
              )
            })}
          </div>
          <form onSubmit={onSubmitProgrammingLanguageTags}>
            <input
              type="text"
              name="text"
              value={searchInput}
              onChange={(e) => onChangeProgrammingLanguageTags(e.target.value)}
              placeholder="プログラミング言語を入力してください。"
              autoComplete="off"
              required
            />
            <button type="submit">追加</button>
          </form>
          <div>
            {searchedResults.map((result) => {
              return (
                <div
                  onClick={(e) => setSearchInput(result.name)}
                  key={result.id}
                >
                  {result.name}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <div>
            {programmingLanguageTags.map((tag) => {
              return (
                <>
                  <div key={tag.id}>{tag.name}</div>
                </>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
