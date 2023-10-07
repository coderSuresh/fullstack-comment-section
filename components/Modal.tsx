import { ModalProps } from "@/types/props"

const Modal = ({ title, message, positive, negative, confirm, cancel }: ModalProps) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className='bg-white sm:w-[350px] text-start w-full mx-5 rounded-lg sm:p-6 p-4'>
                <h2 className='font-medium text-xl'>
                    {title}
                </h2>
                <hr className='my-2' />
                <p className='text-grayish-blue text-sm my-5'>
                    {message}
                </p>
                <div className='flex gap-3 text-white'>
                    {
                        cancel &&
                        <button onClick={cancel} className='bg-grayish-blue text-sm rounded-md sm:px-4 p-2 sm:py-3 flex-grow uppercase font-medium hover:opacity-50'>
                            {negative}
                        </button>
                    }
                    <button onClick={confirm} className='bg-soft-red text-white text-sm sm:px-4 p-2 sm:py-3 rounded-md flex-grow uppercase font-medium hover:opacity-50'>
                        {positive}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal