import React, { useState } from 'react'
import { Box } from '../../layout/Box'

interface PresentElementsType {
  element: any
  elementName: string
}

export const PresentElements = ({
  element,
  elementName,
}: PresentElementsType) => {
  const [present, setPresent] = useState(element.present)

  return (
    <>
      {elementName == 'achivement' ? (
        <Box width="80vh" backgroundColor={present ? 'pink' : 'grey'}>
          <div>title:{element.title}</div>
          <div>text:{element.text}</div>
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
          <div>start date:{element.startDateOn}</div>
          <div>end date:{element.endDateOn}</div>
        </Box>
      ) : (
        <Box width="80vh" backgroundColor={present ? 'black' : 'grey'}>
          <div>{element.text}</div>
          <div>{element.time}</div>
          <div>{element.reportDateOn}</div>
        </Box>
      )}
    </>
  )
}
