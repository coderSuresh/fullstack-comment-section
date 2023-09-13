import React from 'react'
import Image from 'next/image'

const CommentCard = () => {
    return (
        <div className='bg-white p-5 text-dark-blue relative rounded-md flex gap-5 mb-5 sm:flex-row flex-col-reverse'>

            {/* upvote/ downvote section */}
            <div className='flex sm:flex-col sm:py-3 px-3 sm:gap-2 gap-x-5  bg-very-light-gray w-fit h-fit rounded-xl text-center'>
                <button className='text-light-grayish-blue hover:text-moderate-blue'>
                    <i className='fas fa-plus'></i>
                </button>

                <p className='text-moderate-blue font-medium my-3'>22</p>

                <button className='text-light-grayish-blue hover:text-moderate-blue'>
                    <i className='fas fa-minus'></i>
                </button>
            </div>

            {/* comment section */}
            <div className='w-full'>
                {/* comment header */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <Image src='/images/avatars/image-amyrobson.webp' alt='user avatar' height={50} width={50} className='w-10 h-10 rounded-full' />
                        <div className='ml-4 flex items-center gap-4'>
                            <p className='font-medium'>John Doe</p>
                            <p className='text-grayish-blue text-sm'>5 hours ago</p>
                        </div>
                    </div>

                    <div className='sm:static absolute bottom-8 right-5'>
                        <button className='flex items-center gap-2 text-moderate-blue hover:opacity-50'>
                            <i className='fas fa-reply'></i>
                            <p className='font-medium'>Reply</p>
                        </button>
                    </div>
                </div>

                {/* comment body */}
                <div className='mt-4'>
                    <p className='text-grayish-blue text-sm leading-5'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate dolor, odit asperiores veritatis nihil eos, accusantium at ipsam suscipit voluptatum voluptatibus dolores et ea accusamus inventore. Corrupti ea similique eligendi!
                    </p>
                </div>
            </div>

        </div>
    )
}

export default CommentCard