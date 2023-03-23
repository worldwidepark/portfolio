import React, { useEffect, useState } from 'react'

export const SearchProgrammingLanguageTags = ({
  isCurrentUser,
  programmingLanguageTags,
  searchInput,
  searchedResults,
  setSearchInput,
  onClickDeleteProgrammingLanguageTag,
  onChangeProgrammingLanguageTags,
  onSubmitProgrammingLanguageTags,
}) => {
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
