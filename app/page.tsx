'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CommentCard from '@/components/CommentCard'
import AddComment from '@/components/AddComment'
import { UserContext } from '@/context/UserContext'

const Home = () => {

  const { values } = React.useContext(UserContext)
  const router = useRouter()

  const checkIfUserIsLoggedIn = () => {
    if (!values.isLoggedIn) {
      router.push('/login')
    }
  }

  React.useEffect(() => {
    checkIfUserIsLoggedIn()
  }, [])

  return (
    <>
      {values.isLoggedIn ?
        <>
          <header className='md:w-[740px] md:mx-auto md:my-10 flex items-center justify-between gap-5 relative bg-white p-5'>
            <div className='flex gap-5 items-center'>
              <Image className='w-12' src='/images/avatars/image-amyrobson.png' height={50} width={50} alt='your profile photo' />
              <div>
                <p className='text-sm text-grayish-blue'>Welcome,</p>
                <p className='font-medium'>{values.name}</p>
              </div>
            </div>

            <button className='flex items-center gap-2 bg-moderate-blue hover:opacity-50 px-4 py-2 rounded-md text-white sm:text-base sm:capitalize text-xs uppercase font-medium'>
              <i className='fas fa-sign-out rotate-180' />
              <p>Logout</p>
            </button>
          </header>

          <main className='md:w-[740px] md:mx-auto mx-3 my-10'>
            {/* TODO: figure out how to upvote once per user per comment */}
            <CommentCard />
            <CommentCard />
            {/* replies */}
            <div className='border-l sm:pl-10 pl-3 sm:ml-10 '>
              <CommentCard />
              <CommentCard />
            </div>
            <AddComment />
          </main>
        </>
        : null
      }
    </>
  )
}

export default Home