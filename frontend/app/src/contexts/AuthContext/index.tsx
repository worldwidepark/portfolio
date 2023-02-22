import { createContext } from 'react'

export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<undefined>>
    authMessage: string
    setAuthMessage: React.Dispatch<React.SetStateAction<string>>
    combinedTime: number
    setCombinedTime: React.Dispatch<React.SetStateAction<number>>
  }
)
