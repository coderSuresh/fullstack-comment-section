import { ChildrenProps } from '@/types/props'
import './globals.css'
import type { Metadata } from 'next'

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}


export default RootLayout