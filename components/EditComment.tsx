import React from 'react'
import { CommentProps } from '@/types/props'
import { EditCommentContext } from '@/context/EditCommentContext'
import Modal from './Modal'

const EditComment = ({ comment, commentID, _id }: CommentProps) => {

    const [commenting, setCommenting] = React.useState(false)
    const [localComment, setLocalComment] = React.useState(comment)

    const [needsToShowModal, setNeedsToShowModal] = React.useState({
        show: false,
        message: '',
    })

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
            setNeedsToShowModal({
                show: true,
                message: data.error,
            })
            return
        }

        setEditCommentValues({
            ...editCommentValues,
            editComment: false,
            editedComment: localComment!,
        })
    }

    return (
        <>
            {
                needsToShowModal.show &&
                <Modal
                    title='Error'
                    positive='Ok'
                    message={needsToShowModal.message}
                    confirm={() => setNeedsToShowModal({ show: false, message: '' })}
                />
            }

            <form action="#" onSubmit={updateComment} className='flex flex-1 flex-col items-start gap-5'>
                <textarea
                    required
                    value={localComment}
                    onChange={(e) => setLocalComment(e.currentTarget.value)}
                    placeholder='Add a reply...'
                    name="comment" id="comment"
                    className='placeholder-grayish-blue
                    resize-none border rounded-md w-full h-24 py-3 px-5 focus:border-moderate-blue focus:outline-none
                    '
                />
                <div className='self-end flex items-center bg-white sm:static absolute bottom-5 right-5'>
                    <button aria-label='cancel edit'>
                        <i
                            onClick={() => setEditCommentValues({ ...editCommentValues, editComment: false })}
                            className='fas fa-times mr-5 text-xl'
                        />
                    </button>
                    <button
                        className='bg-moderate-blue text-white px-5 py-2 uppercase rounded-md font-medium hover:opacity-50'
                    >
                        {commenting ? 'Updating' : 'Update'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditComment