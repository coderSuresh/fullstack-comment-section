'use client'
import { UserContext } from '@/context/UserContext'
import { UserContextType } from '@/types/UserContextTypes'
import { ChildrenProps } from '@/types/props'
import React from 'react'

const UserProvider = ({ children }: ChildrenProps) => {

  const [values, setValues] = React.useState<UserContextType>(
    {
      name: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).name : '',
      username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : '',
      isLoggedIn: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).isLoggedIn : false,
    }
  )

  return (
    <UserContext.Provider value={{ values, setValues }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider