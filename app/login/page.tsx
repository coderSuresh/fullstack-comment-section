'use client'
import Link from 'next/link'
import React from 'react'

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <>
            <h1 className='text-2xl font-semibold mb-5 text-center'>Login</h1>

            <form className='flex flex-col'>

                <label className='mb-2'>Username</label>
                <input
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='johndoe'
                />

                <label className='mb-2'>Password</label>
                <div className='relative'>
                    <input
                        className='mb-5 p-2 w-full border focus:outline-none focus:border-moderate-blue rounded-md'
                        type={`${showPassword ? 'text' : 'password'}`} placeholder='xxxxxxxx'
                    />
                    <button type='button' onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        <i className={`fas fa-eye${showPassword ? '-slash' : ''} absolute right-2 top-3`} />
                   </button>
                </div>

                <p className='mb-5 text-right text-sm'>
                    Forgot your password? <Link href='/forgot-password' className='text-moderate-blue'>Reset</Link>
                </p>

                <button className='bg-moderate-blue outline focus:outline-4 hover:outline-outline-color focus:outline-outline-color uppercase font-medium text-white py-2 rounded-md'>
                    Login
                </button>

                <p className='mt-5 text-center'>
                    Don't have an account? <Link href='/register' className='text-moderate-blue'>Register</Link>
                </p>

            </form>
        </>
    )
}

export default Login