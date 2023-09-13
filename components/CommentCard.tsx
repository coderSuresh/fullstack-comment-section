import React from 'react'
import UpvoteDownvote from './UpvoteDownvote'
import CommentBody from './CommentBody'

const CommentCard = () => {
    return (
        <div className='bg-white p-5 text-dark-blue relative rounded-md flex gap-5 mb-5 sm:flex-row flex-col-reverse'>

            <UpvoteDownvote />
            <CommentBody />

        </div>
    )
}

export default CommentCard