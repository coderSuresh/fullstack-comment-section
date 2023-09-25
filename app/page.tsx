'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CommentCard from '@/components/CommentCard'
import AddComment from '@/components/AddComment'
import { UserContext } from '@/context/UserContext'
import { ReplyContext } from '@/context/ReplyContext'
import { CommentProps } from '@/types/props'
import AddReply from '@/components/AddReply'

const Home = () => {

  const { values, setValues } = React.useContext(UserContext)
  const { reply, setReply } = React.useContext(ReplyContext)
  const router = useRouter()

  const [comments, setComments] = React.useState<CommentProps[]>([])
  const [loading, setLoading] = React.useState(false)

  // TODO: localhost data can be tempered for example:
  // if username is changed, and comment posted, the comment will be posted under the new username
  // which doesn't exist in the database

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

  const fetchComments = async () => {
    setLoading(true)
    const res = await fetch('/api/get-comments', {
      cache: 'no-store',
    })
    const data = await res.json()

    if (data.error) {
      console.log(data.error)
    }

    setComments(data)
    setLoading(false)
    return data
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  const renderComments = () => {
    return comments.map((comment: CommentProps) => {

      let replyElems = null

      if (comment.replies?.length! > 0) {
        replyElems = comment.replies?.map((reply: string) => {

          const replyObj = JSON.parse(reply) as CommentProps

          return (
            <div key={replyObj._id}>
              <CommentCard {...replyObj} />
              {(replyObj.isReplying && replyObj.replyTo === comment.author) &&
                <AddReply author={comment.author} _id={comment._id} />
              }
            </div>
          )
        })
      }

      return (
        <div key={comment._id}>
          <CommentCard {...comment} />
          {(reply.isReplying && reply.replyTo === comment.author) &&
            <AddReply author={comment.author} _id={comment._id} />
          }

          {comment.replies?.length! > 0 &&
            <div className='border-l sm:pl-10 pl-3 sm:ml-10 '>
              {replyElems}
            </div>
          }

        </div>
      )
    })
  }

  React.useEffect(() => {
    renderComments()
  }, [reply])

  return (
    <>
      {values.isLoggedIn ?
        <>
          <header className='md:w-[740px] md:mx-auto md:static md:my-10 flex items-center justify-between gap-5 mb-5 absolute top-0 left-0 right-0 bg-white p-5'>
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

          <main className='md:mt-0 mt-28'>
            {
              loading ?
                <>
                  <CommentCard loading={loading} />
                  <CommentCard loading={loading} />
                  <CommentCard loading={loading} />
                </>
                :
                comments.length > 0 ?
                  renderComments()
                  : <p className='text-center text-grayish-blue my-10'>No comments yet</p>
            }
            <AddComment setComments={setComments} />
          </main>
        </>
        : null
      }
    </>
  )
}

export default Home