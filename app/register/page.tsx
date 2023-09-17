'use client'
import Link from 'next/link'
import React from 'react'

const Register = () => {

    const [showPassword1, setShowPassword1] = React.useState(false)
    const [showPassword2, setShowPassword2] = React.useState(false)

    return (
        <>
            <h1 className='text-2xl font-semibold mb-5 text-center'>Register</h1>

            <form className='flex flex-col'>
                <label className='mb-2'>Name</label>
                <input
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='John Doe'
                />

                <label className='mb-2'>Username</label>
                <input
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='johndoe'
                />

                <label className='mb-2'>Password</label>
                <div className='relative'>
                    <input
                        className='mb-5 p-2 w-full border focus:outline-none focus:border-moderate-blue rounded-md'
                        type={`${showPassword1 ? 'text' : 'password'}`} placeholder='xxxxxxxx'
                    />
                    <button type='button' onClick={() => setShowPassword1((showPassword) => !showPassword)}>
                        <i className={`fas fa-eye${showPassword1 ? '-slash' : ''} absolute right-2 top-3`} />
                    </button>
                </div>

                <label className='mb-2'>Confirm password</label>
                <div className='relative'>
                    <input
                        className='mb-5 p-2 w-full border focus:outline-none focus:border-moderate-blue rounded-md'
                        type={`${showPassword2 ? 'text' : 'password'}`} placeholder='xxxxxxxx'
                    />
                    <button type='button' onClick={() => setShowPassword2((showPassword) => !showPassword)}>
                        <i className={`fas fa-eye${showPassword2 ? '-slash' : ''} absolute right-2 top-3`} />
                    </button>
                </div>

                <button className='bg-moderate-blue hover:opacity-50 uppercase font-medium text-white py-2 rounded-md'>
                    Register
                </button>

                <p className='mt-5 text-center'>
                    Already have an account? <Link href='/login' className='text-moderate-blue'>Login</Link>
                </p>
            </form>
        </>
    )
}

export default Register