import React from 'react'
import Image from 'next/image'

const AddComment = () => {
    return (
        <div className='bg-white p-5 text-dark-blue relative rounded-md flex gap-5 mb-5 sm:flex-row items-start'>
            <Image
                src='/images/avatars/image-amyrobson.png'
                alt='your-avatar' height={50} width={50}
                className='sm:static sm:w-12 w-10 absolute bottom-5 left-5'
            />
            <form action="#" className='flex flex-1 items-start gap-5'>
                <textarea
                    placeholder='Add a comment...'
                    name="comment" id="comment"
                    className='sm:mb-0 mb-[60px] placeholder-grayish-blue
                    resize-none border rounded-md flex-grow h-24 py-3 px-5 focus:border-moderate-blue focus:outline-none
                    '
                />
                <button
                    className='bg-moderate-blue text-white px-5 py-2 uppercase rounded-md font-medium hover:opacity-50
                        sm:static absolute bottom-5 right-5'
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default AddComment