'use client'
import { UserContext } from '@/context/UserContext'
import { CommentProps } from '@/types/props'
import React from 'react'

const UpvoteDownvote = ({ _id, score, author, commentID }: CommentProps) => {

    const [vote, setVote] = React.useState(score || 0)
    const [voting, setVoting] = React.useState(false)

    const { values } = React.useContext(UserContext)

    // TODO: implement real upvote system
    /*
        * it should have backend so that it can't be altered.
        * one user can upvote one comment/reply only one time.
        * and if the user clicks upvote/downvote again, show some alert telling it can't be done twice.
        * one can't upvote his own comment/reply 
        * but how to store data on database and how to validate???
    */

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

                if (data.error) alert(data.error)

                setVoting(false)
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