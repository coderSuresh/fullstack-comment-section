import React from 'react'
import { CommentProps } from '@/types/props'
import { ReplyContext } from '@/context/ReplyContext'

const CommentCardBtns = ({ _id, author }: CommentProps) => {

    const { reply, setReply } = React.useContext(ReplyContext)

    const changeReplyContext = () => {
        setReply({
            replyTo: author,
            commentID: reply.commentID === _id ? '' : _id,
            reply: '',
        })
    }

    return (
        <div className='sm:static absolute bottom-8 right-5'>
            <button onClick={() => changeReplyContext()} className='flex items-center gap-2 text-moderate-blue hover:opacity-50'>
                <i className='fas fa-reply'></i>
                <p className='font-medium'>Reply</p>
            </button>
        </div>
    )
}

export default CommentCardBtns