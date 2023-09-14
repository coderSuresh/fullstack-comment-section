import React from 'react'
import CommentCard from '@/components/CommentCard'

const Home = () => {
  return (
    <main className='md:w-[740px] md:mx-auto mx-5 my-10'>
      <CommentCard />
      <CommentCard />
      {/* replies */}
      <div className='border-l sm:pl-10 pl-5 sm:ml-10 '>
        <CommentCard />
        <CommentCard />
      </div>
    </main>
  )
}

export default Home