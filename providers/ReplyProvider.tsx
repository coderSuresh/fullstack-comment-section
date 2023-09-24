'use client'
import React from 'react'
import { ReplyContext } from '@/context/ReplyContext'
import { ChildrenProps } from '@/types/props'
import { ReplyContextType } from '@/types/ReactContextTypes'

const ReplyProvider = ({children}: ChildrenProps) => {

    const [reply, setReply] = React.useState<ReplyContextType>({
        isReplying: false,
        replyTo: '',
        reply: '',
    })

    return (
        <ReplyContext.Provider value={{reply, setReply}}>
            {children}
        </ReplyContext.Provider>
    )
}

export default ReplyProvider