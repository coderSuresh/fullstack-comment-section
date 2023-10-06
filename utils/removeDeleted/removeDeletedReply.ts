import { CommentProps } from "@/types/props"

const removeDeletedReply = (commentId: string, replyId: string, comments: CommentProps[], setComments: React.Dispatch<React.SetStateAction<CommentProps[]>>) => {
    const newCommentsAfterDelete = comments.map((comment: CommentProps) => {
        if (comment._id === commentId) {
            const newReplies = comment.replies?.filter((reply: CommentProps) => reply._id !== replyId)
            return {
                ...comment,
                replies: newReplies
            } as CommentProps
        }
        return comment
    })
    setComments(newCommentsAfterDelete)
}

export { removeDeletedReply }