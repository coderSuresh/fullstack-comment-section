'use client'
import React from 'react'

const UpvoteDownvote = () => {

    const [upvote, setUpvote] = React.useState(0)

    return (
        <div className='flex sm:flex-col sm:py-3 px-3 sm:gap-2 gap-x-5  bg-very-light-gray w-fit h-fit rounded-xl text-center'>
            <button onClick={() => setUpvote(prevUpvote => prevUpvote + 1)} className='text-light-grayish-blue hover:text-moderate-blue'>
                <i className='fas fa-plus'></i>
            </button>

            <p className='text-moderate-blue font-medium my-3'>{upvote}</p>

            <button onClick={() => setUpvote(prevUpvote => prevUpvote && prevUpvote - 1)} className='text-light-grayish-blue hover:text-moderate-blue'>
                <i className='fas fa-minus'></i>
            </button>
        </div>
    )
}

export default UpvoteDownvote