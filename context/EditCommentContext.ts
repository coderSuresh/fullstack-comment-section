import React from 'react'
import { EditCommentContextType } from '@/types/EditCommentContextType'

const EditCommentContext = React.createContext({
    editCommentValues: {} as EditCommentContextType,
    setEditCommentValues: (editCommentValues: EditCommentContextType) => { }
})

export { EditCommentContext }