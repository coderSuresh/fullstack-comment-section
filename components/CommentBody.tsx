import React from 'react'
import Image from 'next/image'
import CommentCardBtns from './CommentCardBtns'
import { CommentProps } from '@/types/props'
import { UserContext } from '@/context/UserContext'
import { formatDistanceToNow } from 'date-fns'
import { EditCommentContext } from '@/context/EditCommentContext'
import EditComment from './EditComment'

const CommentBody = ({ _id, author, commentID, userId, replyTo, comment, createdAt, loading }: CommentProps) => {

    const { values } = React.useContext(UserContext)
    const { editCommentValues } = React.useContext(EditCommentContext)

    const renderTime = (createdAt: Date) => {
        const timeAgo = formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
        })

        return timeAgo
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <Image priority src={`/images/avatars/${loading ? 'placeholder.svg' : 'image-amyrobson.webp'}`} alt='user avatar' height={50} width={50} className='w-10 h-10 rounded-full' />
                    <div className='ml-4 flex items-center gap-4'>
                        <div className='flex gap-3 items-center'>
                            <div className='font-medium'>
                                {
                                    loading ?
                                        <div className='bg-light-gray animate-pulse h-4 w-24 rounded-md'></div>
                                        :
                                        author
                                }
                            </div>

                            {/* render if it is user's own comment or reply */}
                            {
                                values.isLoggedIn && values.username === author &&
                                <p className='rounded bg-moderate-blue text-white text-sm px-2 font-medium'>
                                    you
                                </p>
                            }

                        </div>
                        <div className='text-grayish-blue text-sm'>
                            {
                                loading ?
                                    <div className='bg-light-gray animate-pulse h-4 w-20 rounded-md'></div>
                                    :
                                    renderTime(createdAt!)
                            }
                        </div>
                    </div>
                </div>

                <CommentCardBtns _id={_id} isReply={commentID ? true : false} commentID={commentID || _id} userId={userId} author={author} />

            </div>

            <div className='mt-4'>
                <div className='text-grayish-blue text-sm leading-5'>
                    {
                        loading ?
                            <div className='bg-light-gray animate-pulse h-24 w-full rounded-md'></div>
                            :
                            replyTo &&
                            <span className='font-medium text-moderate-blue'>@{replyTo} </span>
                    }
                    {
                        editCommentValues.editComment && editCommentValues.id === _id
                            ?
                            // only reply has commentID field in DB.
                            <EditComment comment={comment} isReply={commentID ? true : false} commentID={commentID || _id} _id={_id} />
                            :
                            comment
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentBody