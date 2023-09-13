import React from 'react'
import Image from 'next/image'
import CommentCardBtns from './CommentCardBtns'

const CommentBody = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <Image src='/images/avatars/image-amyrobson.webp' alt='user avatar' height={50} width={50} className='w-10 h-10 rounded-full' />
                    <div className='ml-4 flex items-center gap-4'>
                        <p className='font-medium'>John Doe</p>
                        <p className='text-grayish-blue text-sm'>5 hours ago</p>
                    </div>
                </div>

                <CommentCardBtns />

            </div>

            <div className='mt-4'>
                <p className='text-grayish-blue text-sm leading-5'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate dolor, odit asperiores veritatis nihil eos, accusantium at ipsam suscipit voluptatum voluptatibus dolores et ea accusamus inventore. Corrupti ea similique eligendi!
                </p>
            </div>
        </div>
    )
}

export default CommentBody