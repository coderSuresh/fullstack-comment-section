import React from 'react'
import { ReplyContextType } from '@/types/ReactContextTypes'

const ReplyContext = React.createContext({
    reply: {} as ReplyContextType,
    setReply: (reply: ReplyContextType) => { },
})

export { ReplyContext }