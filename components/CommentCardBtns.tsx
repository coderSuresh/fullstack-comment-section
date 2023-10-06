import React from 'react'
import { CommentProps } from '@/types/props'
import { ReplyContext } from '@/context/ReplyContext'
import { UserContext } from '@/context/UserContext'
import { CommentContext } from '@/context/CommentContext'

const CommentCardBtns = ({ _id, userId, author }: CommentProps) => {

    const { reply, setReply } = React.useContext(ReplyContext)
    const { values } = React.useContext(UserContext)
    const { setDeletedCommentValues } = React.useContext(CommentContext)

    const [isAuthor, setIsAuthor] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [deleting, setDeleting] = React.useState(false)

    const checkIfUserIsAuthor = async () => {
        fetch('/api/verify-author', {
            method: 'POST',
            body: JSON.stringify({ 'username': values.username, 'userId': userId, 'author': author })
        })
            .then(res => res.json())
            .then(data => {

                setLoading(false)

                if (data.error) {
                    console.log(data.error)
                    return
                }

                setIsAuthor(data.isAuthor)
            })
    }

    React.useEffect(() => {
        checkIfUserIsAuthor()
    }, [])

    const changeReplyContext = () => {
        setReply({
            replyTo: author,
            commentID: reply.commentID === _id ? '' : _id,
            reply: '',
        })
    }

    const deleteComment = async () => {
        setDeleting(true)
        const res = await fetch('/api/delete-comment', {
            method: 'DELETE',
            body: JSON.stringify({ 'commentID': _id })
        })
        const data = await res.json()

        setDeleting(false)

        if (data.error) {
            alert(data.error)
            return
        }

        setDeletedCommentValues({
            isDeleted: true,
            commentID: _id!,
        })
    }

    return (
        <div className='sm:static absolute bottom-8 right-5'>

            {loading
                ?
                <div className='h-4 w-12 rounded bg-light-gray animate-pulse'></div>
                :
                isAuthor
                    ?
                    <div className='flex items-center gap-x-5'>
                        {
                            deleting
                                ?
                                <p className='font-medium text-soft-red text-sm'>Deleting...</p>
                                :
                                <button onClick={() => deleteComment()} className='flex items-center gap-x-2 hover:opacity-50 text-sm font-medium text-soft-red'>
                                    <i className='fas fa-trash text-xs' />
                                    <span>Delete</span>
                                </button>
                        }

                        <button className='flex items-center gap-x-2 hover:opacity-50 text-sm font-medium text-moderate-blue'>
                            <i className='fas fa-pencil text-xs' />
                            <span>Edit</span>
                        </button>
                    </div>
                    :
                    <button onClick={() => changeReplyContext()} className='flex items-center gap-2 text-moderate-blue hover:opacity-50'>
                        <i className='fas fa-reply'></i>
                        <p className='font-medium'>Reply</p>
                    </button>
            }
        </div>
    )
}

export default CommentCardBtns