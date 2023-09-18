import React from 'react'
import UpvoteDownvote from './UpvoteDownvote'
import CommentBody from './CommentBody'

const CommentCard = () => {
    return (
        <div className='bg-white md:p-5 p-3 text-dark-blue relative rounded-md flex md:gap-5 gap-3 mb-5 sm:flex-row flex-col-reverse'>

            <UpvoteDownvote />
            <CommentBody />

        </div>
    )
}

export default CommentCard