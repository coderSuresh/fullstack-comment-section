import React from 'react'

const CommentCardBtns = () => {
    return (
        <div className='sm:static absolute bottom-8 right-5'>
            <button className='flex items-center gap-2 text-moderate-blue hover:opacity-50'>
                <i className='fas fa-reply'></i>
                <p className='font-medium'>Reply</p>
            </button>
        </div>
    )
}

export default CommentCardBtns