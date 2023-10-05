'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserContext'

const Login = () => {

    const { values, setValues } = React.useContext(UserContext)

    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })
    const [error, setError] = React.useState('')

    const router = useRouter()

    const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (e.currentTarget.checkValidity()) {
            setLoading(true)
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }
                    else {

                        const userValues = {
                            name: data.name,
                            username: data.username,
                            id: data.id,
                            isLoggedIn: data.isLoggedIn,
                        }

                        setValues(userValues)
                        localStorage.setItem('user', JSON.stringify(userValues))
                    }
                    setLoading(false)
                })
        }
        else {
            e.currentTarget.reportValidity()
        }
    }

    React.useEffect(() => {
        if (values.isLoggedIn) {
            router.push('/')
        }
    }, [values, router])

    React.useEffect(() => {
        setError('')
    }, [formData])

    return (
        <main className='bg-white sm:p-5 p-3 rounded-md  max-w-md mx-auto'>
            <h1 className='text-2xl font-semibold mb-5 text-center'>Login</h1>

            <form onSubmit={(e) => loginUser(e)} className='flex flex-col'>

                {error && <p className='mb-5 text-soft-red text-sm text-center'>{error}</p>}

                <label className='mb-2'>Username</label>
                <input
                    required
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    value={formData.username}
                    className='mb-5 p-2 border focus:outline-none focus:border-moderate-blue rounded-md'
                    type='text' placeholder='johndoe'
                />

                <label className='mb-2'>Password</label>
                <div className='relative'>
                    <input
                        required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password}
                        className='mb-5 p-2 w-full border focus:outline-none focus:border-moderate-blue rounded-md'
                        type={`${showPassword ? 'text' : 'password'}`} placeholder='xxxxxxxx'
                    />
                    <button type='button' tabIndex={-1} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        <i className={`fas fa-eye${showPassword ? '-slash' : ''} absolute right-2 top-3`} />
                    </button>
                </div>

                <p className='mb-5 text-right text-sm'>
                    Forgot your password? <Link href='/forgot-password' className='text-moderate-blue'>Reset</Link>
                </p>

                <button disabled={loading} className='bg-moderate-blue outline focus:outline-4 hover:outline-outline-color focus:outline-outline-color uppercase font-medium text-white py-2 rounded-md'>
                    {loading ? <i className='fas fa-spinner fa-spin' /> : 'Login'}
                </button>

                <p className='mt-5 text-center'>
                    Don&apos;t have an account? <Link href='/register' className='text-moderate-blue'>Register</Link>
                </p>

            </form>
        </main>
    )
}

export default Login