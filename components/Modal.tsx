import React from 'react'

const Modal = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className='bg-white sm:w-[350px] w-full mx-5 rounded-lg sm:p-6 p-4'>
                <h2 className='font-medium text-xl'>
                    Delete comment
                </h2>
                <p className='text-grayish-blue text-sm my-5'>
                    Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.
                </p>
                <div className='flex gap-3 text-white'>
                    <button className='bg-grayish-blue text-sm rounded-md sm:px-4 p-2 sm:py-3 flex-grow uppercase font-medium hover:opacity-50'>
                        No, Cancel
                    </button>
                    <button className='bg-soft-red text-white text-sm sm:px-4 p-2 sm:py-3 rounded-md flex-grow uppercase font-medium hover:opacity-50'>
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal