'use client'
import React from 'react'
import { EditCommentContext } from '@/context/EditCommentContext'
import { ChildrenProps } from '@/types/props'
import { EditCommentContextType } from '@/types/EditCommentContextType'

const EditCommentProvider = ({ children }: ChildrenProps) => {

    const [editCommentValues, setEditCommentValues] = React.useState<EditCommentContextType>({
        editComment: false,
        id: '',
    })

    return (
        <EditCommentContext.Provider value={{ editCommentValues, setEditCommentValues }}>
            {children}
        </EditCommentContext.Provider>
    )
}

export default EditCommentProvider