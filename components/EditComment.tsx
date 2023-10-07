import React from 'react'
import { CommentProps } from '@/types/props'
import { EditCommentContext } from '@/context/EditCommentContext'

const EditComment = ({ comment, commentID, isReply, _id }: CommentProps) => {

    const [commenting, setCommenting] = React.useState(false)
    const [localComment, setLocalComment] = React.useState(comment)

    const { editCommentValues, setEditCommentValues } = React.useContext(EditCommentContext)

    const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCommenting(true)

        const res = await fetch('/api/update-comment', {
            method: 'PUT',
            body: JSON.stringify({ 'comment': localComment, 'id': _id, 'commentId': commentID })
        })

        const data = await res.json()

        setCommenting(false)

        if (data.error) {
            alert(data.error)
            return
        }

        console.log(commentID, isReply)

        setEditCommentValues({
            ...editCommentValues,
            editComment: false,
            editedComment: localComment!,
        })
    }

    return (
        <form action="#" onSubmit={updateComment} className='flex flex-1 flex-col items-start gap-5'>
            <textarea
                required
                value={localComment}
                onChange={(e) => setLocalComment(e.currentTarget.value)}
                placeholder='Add a reply...'
                name="comment" id="comment"
                className='sm:mb-0 mb-[60px] placeholder-grayish-blue
                    resize-none border rounded-md w-full h-24 py-3 px-5 focus:border-moderate-blue focus:outline-none
                    '
            />
            <button
                className='bg-moderate-blue self-end text-white px-5 py-2 uppercase rounded-md font-medium hover:opacity-50
                        sm:static absolute bottom-5 right-5'
            >
                {commenting ? 'Updating' : 'Update'}
            </button>
        </form>
    )
}

export default EditComment