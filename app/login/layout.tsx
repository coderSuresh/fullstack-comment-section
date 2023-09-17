import { ChildrenProps } from '@/types/props'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login | Comments',
}

const RootLayout = ({
    children,
}: ChildrenProps) => {
    return (
        <html lang="en">
            <body>
                <main className='md:max-w-md md:mx-auto mx-5 my-10 bg-white sm:p-10 p-5 rounded-md'>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout