import { CommentProps } from "@/types/props"

const removeDeletedComment = (commentId: string, comments: CommentProps[], setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>) => {
    const newCommentsAfterDelete = comments.filter((comment: CommentProps) => comment._id !== commentId)
    setComments(newCommentsAfterDelete)
}

export { removeDeletedComment }