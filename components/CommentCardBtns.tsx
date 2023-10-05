import React from 'react'
import { CommentProps } from '@/types/props'
import { ReplyContext } from '@/context/ReplyContext'
import { UserContext } from '@/context/UserContext'

const CommentCardBtns = ({ _id, userId, author }: CommentProps) => {

    const { reply, setReply } = React.useContext(ReplyContext)
    const { values } = React.useContext(UserContext)

    const [isAuthor, setIsAuthor] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

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

    return (
        <div className='sm:static absolute bottom-8 right-5'>

            {loading
                ?
                <div className='h-4 w-12 rounded bg-light-gray animate-pulse'></div>
                :
                isAuthor
                    ?
                    <div className='flex items-center gap-x-5'>
                        <button className='flex items-center gap-x-2 hover:opacity-50 text-sm font-medium text-soft-red'>
                            <i className='fas fa-trash text-xs' />
                            <span>Delete</span>
                        </button>

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