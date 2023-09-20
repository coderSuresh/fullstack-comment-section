import React from 'react'
import Image from 'next/image'
import CommentCardBtns from './CommentCardBtns'
import { CommentProps } from '@/types/props'
import { UserContext } from '@/context/UserContext'

const CommentBody = ({ author, comment, createdAt, loading }: CommentProps) => {

    const { values } = React.useContext(UserContext)

    const renderTime = (createdAt: Date) => {
        const postedDateTime = new Date(createdAt)
        const now = new Date()

        const seconds = Math.floor((now.getTime() - postedDateTime.getTime()) / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)

        switch (true) {
            case (seconds < 60):
                return `${seconds} seconds ago`
            case (minutes < 60):
                return `${minutes} minutes ago`
            case (hours < 24):
                return `${hours} hours ago`
            case (days < 7):
                return `${days} days ago`
            case (weeks < 4):
                return `${weeks} weeks ago`
            case (months < 12):
                return `${months} months ago`
            case (years >= 1):
                return `${years} years ago`
            default:
                return 'just now'
        }
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

                <CommentCardBtns />

            </div>

            <div className='mt-4'>
                <div className='text-grayish-blue text-sm leading-5'>
                    {
                        loading ?
                            <div className='bg-light-gray animate-pulse h-24 w-full rounded-md'></div>
                            :
                            comment
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentBody