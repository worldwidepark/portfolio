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
  reportDateOn?: string
}

export type AchivementType = {
  id: number
  title: string
  text: string
  urls: string[]
  startDateOn?: string
  endDateOn?: string
  present?: boolean
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

export type DailyReportType = {
  id: number
  reportDateOn: string
  text: string
  time: number
  present?: boolean
  combinedTime?: number
}
