import React from 'react'
import { CommentContextType } from '@/types/CommentContextType'

const CommentContext = React.createContext({
    deletedCommentValues: {} as CommentContextType,
    setDeletedCommentValues: (values: CommentContextType) => { }
})

export { CommentContext }