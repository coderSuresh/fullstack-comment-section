'use client'
import Link from 'next/link'
import React from 'react'

const Register = () => {

    const [showPassword1, setShowPassword1] = React.useState(false)
    const [showPassword2, setShowPassword2] = React.useState(false)

    const [errors, setErrors] = React.useState({
        password: '',
    })

    const [formData, setFormData] = React.useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (e.currentTarget.checkValidity()) {
            validatePasswords()
        }
        else {
            e.currentTarget.reportValidity()
        }
    }

    const validatePasswords = () => {

        const { password, confirmPassword } = formData

        if (password !== confirmPassword) {
            setErrors((errors) => ({ ...errors, password: 'Passwords do not match' }))
        }
        else {
            setErrors((errors) => ({ ...errors, password: '' }))
        }
    }

    React.useEffect(() => {
        validatePasswords()
    }, [formData.password, formData.confirmPassword])

    return (
        <>
            <h1 className='text-2xl font-semibold mb-5 text-center'>Register</h1>

            <form action='#' onSubmit={registerUser} className='flex flex-col'>
                <label className='mb-2'>Name</label>
                <input
                    required
                    name='name'
                    value={formData.name}
                    onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))}
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='John Doe'
                />

                <label className='mb-2'>Username</label>
                <input
                    required
                    name='username'
                    value={formData.username}
                    onChange={(e) => setFormData((data) => ({ ...data, username: e.target.value }))}
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='johndoe'
                />

                <div className='flex justify-between'>
                    <label className='mb-2'>Password</label>
                    <p className='text-soft-red text-sm'>{errors.password}</p>
                </div>
                <div className='relative'>
                    <input
                        required
                        name='password'
                        value={formData.password}
                        onChange={(e) => setFormData((data) => ({ ...data, password: e.target.value }))}
                        className='mb-5 p-2 w-full border focus:outline-none focus:border-moderate-blue rounded-md'
                        type={`${showPassword1 ? 'text' : 'password'}`} placeholder='xxxxxxxx'
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                        title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                    />
                    <button type='button' onClick={() => setShowPassword1((showPassword) => !showPassword)}>
                        <i className={`fas fa-eye${showPassword1 ? '-slash' : ''} absolute right-2 top-3`} />
                    </button>
                </div>

                <label className='mb-2'>Confirm password</label>
                <div className='relative'>
                    <input
                        required
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((data) => ({ ...data, confirmPassword: e.target.value }))}
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