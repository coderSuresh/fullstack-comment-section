'use client'
import { UserContext } from '@/context/UserContext'
import { UserContextType } from '@/types/UserContextTypes'
import { ChildrenProps } from '@/types/props'
import React from 'react'

const UserProvider = ({ children }: ChildrenProps) => {

  const [values, setValues] = React.useState<UserContextType>(
    {
      name: '',
      username: '',
      isLoggedIn: false,
      loading: true,
    }
  )

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
        const parsedValues = JSON.parse(storedUser)
        setValues(parsedValues);
    }
    setValues((prevValues) => ({ ...prevValues, loading: false }))
  }, [])

  return (
    <UserContext.Provider value={{ values, setValues }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider