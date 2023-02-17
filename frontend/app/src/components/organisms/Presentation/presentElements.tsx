import React, { useState } from 'react'
import { closedPresentation } from '../../../services/presentation/presentation'
import { Box } from '../../layout/Box'

export const PresentElements = ({ userId, element, elementName }) => {
  const [present, setPresent] = useState(element.present)

  // const reversePresent = (present) => {
  //   return !present
  // }
  // const onChangePresentState = () => {
  //   closedPresentation(userId, element.id, reversePresent(present))
  //   setPresent(reversePresent)
  // }

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
        </Box>
      ) : (
        <Box width="80vh" backgroundColor={present ? 'black' : 'grey'}>
          <div>{element.text}</div>
        </Box>
      )}
    </>
  )
}
