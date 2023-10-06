'use client'
import React from 'react'
import { CommentContext } from '@/context/CommentContext'
import { CommentContextType } from '@/types/CommentContextType'
import { ChildrenProps } from '@/types/props'

const DeletedCommentProvider = ({ children }: ChildrenProps) => {

    const [deletedCommentValues, setDeletedCommentValues] = React.useState<CommentContextType>({
        isDeleted: false,
        commentID: '',
    })

    return (
        <CommentContext.Provider value={{ deletedCommentValues, setDeletedCommentValues }}>
            {children}
        </CommentContext.Provider>
    )
}

export default DeletedCommentProvider