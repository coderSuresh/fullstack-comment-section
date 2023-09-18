import React from 'react'
import { UserContextType } from '@/types/UserContextTypes'

const UserContext = React.createContext({
    values: {} as UserContextType,
    setValues: (values: UserContextType) => { }
})

export { UserContext }