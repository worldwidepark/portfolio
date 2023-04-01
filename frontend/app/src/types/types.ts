import { ReactNode } from 'react'

export type UserProfileType = {
  id: number
  name: string
  introduce?: string | undefined
  occupation?: string | undefined
  combinedTime?: number
  image?: string
  url?: UserProfileUrlType
  tags?: UserProfileTagsType[]
}
export type UserProfileTagsType = {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export type UserProfileUrlType = {
  url?: string
  selected?: string
}
