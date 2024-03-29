import React from 'react'
import { Box } from '../../layout/Box'

interface MakePresentElementsType {
  element: any
  elementName: string
  onChangePresentState: (element: any, elementName: string) => void
}

export const MakePresentElements = ({
  element,
  elementName,
  onChangePresentState,
}: MakePresentElementsType) => {
  return (
    <>
      {elementName === 'achivement' ? (
        <Box width="80vh" backgroundColor={element.present ? 'pink' : 'grey'}>
          <div>title:{element.title}</div>
          <div>text:{element.text}</div>
          <div>start date:{element.startDateOn}</div>
          <div>end date:{element.endDateOn}</div>
          <div>
            url:
            {element.urls.length == 0 ? (
              <span>no</span>
            ) : (
              <>
                {element.urls.map((url, index) => (
                  <div key={index}>{url}</div>
                ))}
              </>
            )}
          </div>
        </Box>
      ) : (
        <Box width="80vh" backgroundColor={element.present ? 'black' : 'grey'}>
          <div>{element.text}</div>
          <div>{element.time}</div>
          <div>{element.reportDateOn}</div>
        </Box>
      )}

      {element.present ? (
        <button onClick={() => onChangePresentState(element, elementName)}>
          非公開
        </button>
      ) : (
        <button onClick={() => onChangePresentState(element, elementName)}>
          公開
        </button>
      )}
    </>
  )
}
