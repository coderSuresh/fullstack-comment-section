import { ChildrenProps } from '@/types/props'
import './globals.css'
import type { Metadata } from 'next'
import UserProvider from '@/providers/UserProvider'
import ReplyProvider from '@/providers/ReplyProvider'
import DeletedCommentProvider from '@/providers/DeletedCommentProvider'

export const metadata: Metadata = {
  title: 'Comments | CoderSuresh',
  description: 'A full stack comment app built with Next.js, TypeScript, Tailwind CSS, and MongoDB.',
}

const RootLayout = ({
  children,
}: ChildrenProps) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </head>
      <body className='md:w-[740px] md:mx-auto mx-3 md:my-10'>
        <UserProvider>
          <DeletedCommentProvider>
            <ReplyProvider>
              {children}
            </ReplyProvider>
          </DeletedCommentProvider>
        </UserProvider>
      </body>
    </html>
  )
}


export default RootLayout