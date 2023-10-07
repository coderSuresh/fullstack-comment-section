'use client'
import React from 'react'
import Image from 'next/image'
import { UserContext } from '@/context/UserContext'
import { ReplyContext } from '@/context/ReplyContext'
import { ReplyProps } from '@/types/props'
import Modal from './Modal'

const AddReply = ({ author, _id, addReplyToComment }: ReplyProps) => {

    const [comment, setComment] = React.useState('')
    const [commenting, setCommenting] = React.useState(false)
    const [needsToShowModal, setNeedsToShowModal] = React.useState({
        show: false,
        message: '',
    })

    const { values } = React.useContext(UserContext)
    const { setReply } = React.useContext(ReplyContext)

    const postComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setCommenting(true)

        if (!values.username) {
            setNeedsToShowModal({
                show: true,
                message: 'Please log in to post a comment.',
            })
            setCommenting(false)
            return
        }

        const replyObj = {
            comment: comment,
            author: values.username,
            userId: values.id,
            createdAt: new Date(),
            replyTo: author,
            commentID: _id,
        }

        fetch('/api/post-reply', {
            method: 'PUT',
            body: JSON.stringify(replyObj)
        })
            .then(res => res.json())
            .then(data => {

                setCommenting(false)

                if (data.error) {
                    setNeedsToShowModal({
                        show: true,
                        message: data.error,
                    })
                    return
                }

                setReply({
                    replyTo: '',
                    commentID: '',
                    reply: '',
                })

                addReplyToComment(_id!, data.newReply)
                setComment('')
            })
    }

    return (
        <div className='bg-white p-5 text-dark-blue relative rounded-md flex gap-5 mb-5 sm:flex-row items-start'>

            {
                needsToShowModal.show &&
                <Modal
                    title='Error'
                    positive='Ok'
                    message={needsToShowModal.message}
                    confirm={() => setNeedsToShowModal({ show: false, message: '' })}
                />
            }

            <Image
                priority
                src='/images/avatars/image-amyrobson.png'
                alt='your-avatar' height={50} width={50}
                className='sm:static sm:w-12 w-10 absolute bottom-5 left-5'
            />
            <form action="#" onSubmit={(e) => postComment(e)} className='flex flex-1 items-start gap-5'>
                <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    placeholder='Add a reply...'
                    name="comment" id="comment"
                    className='sm:mb-0 mb-[60px] placeholder-grayish-blue
                    resize-none border rounded-md w-full h-24 py-3 px-5 focus:border-moderate-blue focus:outline-none
                    '
                />
                <button
                    className='bg-moderate-blue text-white px-5 py-2 uppercase rounded-md font-medium hover:opacity-50
                        sm:static absolute bottom-5 right-5'
                >
                    {commenting ? 'Sending' : 'Reply'}
                </button>
            </form>
        </div>
    )
}

export default AddReply