import React from 'react'
import UpvoteDownvote from './UpvoteDownvote'
import CommentBody from './CommentBody'
import { CommentProps } from '@/types/props'

const CommentCard = (props: CommentProps) => {
    return (
        <div className='bg-white break-words md:p-5 p-3 text-dark-blue relative rounded-md flex md:gap-5 gap-3 mb-5 sm:flex-row flex-col-reverse'>

            {
                props.loading ?
                    <div className='bg-light-gray animate-pulse sm:h-28 sm:w-10 w-28 h-10 rounded-lg'></div>
                    :
                    <UpvoteDownvote _id={props._id} author={props.author} commentID={props.commentID} score={props.score} />
            }
            <CommentBody {...props} />

        </div>
    )
}

export default CommentCard