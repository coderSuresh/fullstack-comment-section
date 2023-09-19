'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CommentCard from '@/components/CommentCard'
import AddComment from '@/components/AddComment'
import { UserContext } from '@/context/UserContext'

const Home = () => {

  const { values, setValues } = React.useContext(UserContext)
  const router = useRouter()

  React.useEffect(() => {
    const checkIfUserIsLoggedIn = () => {

      const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

      if (!storedUser || !storedUser.isLoggedIn) {
        router.push('/login')
      }
    }
    checkIfUserIsLoggedIn()
  }, [router])

  const logOut = () => {
    localStorage.removeItem('user')
    setValues({})
    router.push('/login')
  }

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

            <button onClick={() => logOut()} className='flex items-center gap-2 bg-moderate-blue hover:opacity-50 px-4 py-2 rounded-md text-white sm:text-base sm:capitalize text-xs uppercase font-medium'>
              <i className='fas fa-sign-out rotate-180' />
              <p>Logout</p>
            </button>
          </header>

          <main>
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