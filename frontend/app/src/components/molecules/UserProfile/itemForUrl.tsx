import React from 'react'

import { FaGithub, FaTwitter, FaBlogger, FaHome } from 'react-icons/fa'
import { UserProfileUrlType } from '../../../types/types'

const itemForUrl = (urlInfo: UserProfileUrlType) => {
  switch (urlInfo.selected) {
    case 'twitter':
      return (
        <a href={urlInfo.url}>
          <FaTwitter />
        </a>
      )
    case 'gitHub':
      return (
        <a href={urlInfo.url}>
          <FaGithub />
        </a>
      )
    case 'blog':
      return (
        <a href={urlInfo.url}>
          <FaBlogger />
        </a>
      )
    case 'homepage':
      return (
        <a href={urlInfo.url}>
          <FaHome />
        </a>
      )
    case '':
      return
  }
}

export default itemForUrl
