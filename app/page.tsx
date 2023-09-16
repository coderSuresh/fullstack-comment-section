import React from 'react'
import CommentCard from '@/components/CommentCard'
import AddComment from '@/components/AddComment'

const Home = () => {
  return (
    <main className='md:w-[740px] md:mx-auto mx-5 my-10'>
      {/* TODO: figure out how to upvote once per user per comment */}
      <CommentCard />
      <CommentCard />
      {/* replies */}
      <div className='border-l sm:pl-10 pl-5 sm:ml-10 '>
        <CommentCard />
        <CommentCard />
      </div>
      <AddComment />
    </main>
  )
}

export default Home