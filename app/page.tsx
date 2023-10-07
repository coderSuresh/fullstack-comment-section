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
import { CommentContext } from '@/context/CommentContext'
import { removeDeletedReply } from '@/utils/removeDeleted/removeDeletedReply'
import { removeDeletedComment } from '@/utils/removeDeleted/removeDeletedComment'
import { EditCommentContext } from '@/context/EditCommentContext'

const Home = () => {

  const { values, setValues } = React.useContext(UserContext)
  const { reply } = React.useContext(ReplyContext)
  const { deletedCommentValues, setDeletedCommentValues } = React.useContext(CommentContext)
  const { editCommentValues, setEditCommentValues } = React.useContext(EditCommentContext)
  const router = useRouter()

  const [comments, setComments] = React.useState<CommentProps[]>([])
  const [loading, setLoading] = React.useState(false)

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

    setLoading(false)

    if (data.error) {
      alert(data.error)
      return
    }

    setComments(data)
    return data
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  // updated ui when a comment or reply is deleted
  React.useEffect(() => {
    if (deletedCommentValues.isDeleted) {

      if (deletedCommentValues.replyID) {
        removeDeletedReply(deletedCommentValues.commentID, deletedCommentValues.replyID, comments, setComments)
      } else {
        removeDeletedComment(deletedCommentValues.commentID, comments, setComments)
      }

      setDeletedCommentValues({
        isDeleted: false,
        commentID: '',
      })
    }
  }, [deletedCommentValues])

  // update ui when a comment or reply is updated by the author
  React.useEffect(() => {
    if (editCommentValues.editedComment) {

      const commentIndex = comments.findIndex(comment => comment._id === editCommentValues.commentId)

      if (commentIndex != -1) {
        const updatedComments = [...comments]

        if (editCommentValues.isReply) {
          const replies = updatedComments[commentIndex].replies

          replies?.map((reply: CommentProps) => {
            if (reply._id === editCommentValues.id) {
              reply.comment = editCommentValues.editedComment
            }
          })

        } else {
          updatedComments[commentIndex].comment = editCommentValues.editedComment
        }

        setComments(updatedComments)
      }
    }
  }, [editCommentValues])

  const addReplyToComment = (commentId: string, newReply: CommentProps) => {
    setComments((prevComments: any) => [
      ...prevComments.map((comment: CommentProps) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: comment.replies ? [...comment.replies, newReply] : [newReply]
          }
        }
        return comment
      })
    ])
  }

  const renderComments = () => {
    return comments.map((comment: CommentProps) => {

      let replyElems = null

      if (comment.replies?.length! > 0) {
        // TODO: maybe it is better to show reply below the original
        // comment or reply instead of showing it at the bottom
        replyElems = comment.replies?.map((replyObj: CommentProps) => {

          return (
            <div key={replyObj._id}>
              <CommentCard {...replyObj} userId={values.id} />
              {(reply.commentID === replyObj._id) &&
                <AddReply addReplyToComment={addReplyToComment} author={replyObj.author} _id={comment._id} />
              }
            </div>
          )
        })
      }

      return (
        <div key={comment._id}>
          <CommentCard {...comment} userId={values.id} />
          {(reply.commentID === comment._id) &&
            <AddReply addReplyToComment={addReplyToComment} author={comment.author} _id={comment._id} />
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