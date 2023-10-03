'use client'
import { UserContext } from '@/context/UserContext'
import { CommentProps } from '@/types/props'
import React from 'react'

const UpvoteDownvote = ({ _id, score, author, commentID }: CommentProps) => {

    const [vote, setVote] = React.useState(score || 0)
    const [voting, setVoting] = React.useState(false)

    const { values } = React.useContext(UserContext)

    const handleUpvote = () => {
        updateDBWithNewVote('up')
    }

    const handleDownVote = () => {
        updateDBWithNewVote('down')
    }

    const updateDBWithNewVote = (upOrDownVote: string) => {
        setVoting(true)
        fetch('/api/upvote', {
            method: 'PUT',
            body: JSON.stringify(
                {
                    'vote': upOrDownVote,
                    'id': _id,
                    'commentID': commentID,
                    'username': values.username,
                    'author': author
                })
        })
            .then(res => res.json())
            .then(data => {

                setVoting(false)

                if (data.error) {
                    alert(data.error)
                    return
                }

                setVote(data.score)
            })
    }

    return (
        <div className='flex sm:flex-col sm:py-3 px-3 sm:gap-2 gap-x-5  bg-very-light-gray w-fit h-fit rounded-xl text-center'>
            <button
                aria-label='upvote'
                onClick={() => handleUpvote()}
                className='text-light-grayish-blue hover:text-moderate-blue'>
                <i className='fas fa-plus'></i>
            </button>

            <p className='text-moderate-blue font-medium my-3'>
                {voting ? '..' : vote}
            </p>

            <button
                aria-label='downvote'
                disabled={vote <= 0}
                onClick={() => handleDownVote()}
                className='text-light-grayish-blue hover:text-moderate-blue'>
                <i className='fas fa-minus'></i>
            </button>
        </div>
    )
}

export default UpvoteDownvote