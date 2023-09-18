'use client'
import { UserContext } from '@/context/UserContext'
import { UserContextType } from '@/types/UserContextTypes'
import { ChildrenProps } from '@/types/props'
import React from 'react'

const UserProvider = ({ children }: ChildrenProps) => {

  const storedUser = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') || '{}')

  const [values, setValues] = React.useState<UserContextType>(
    {
      name: storedUser.name || '',
      username: storedUser.username || '',
      isLoggedIn: storedUser.isLoggedIn || false,
    }
  )

  return (
    <UserContext.Provider value={{ values, setValues }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider