import Register from '@/models/auth/Register'
import { connectDB } from '@/utils/database'

const POST = async (req: Request) => {

    try {
        const { name, password, confirmPassword, username } = await req.json()

        if (!name || !password || !username) return new Response(JSON.stringify({ message: 'All fields are required' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (name.length < 3) return new Response(JSON.stringify({ message: 'Name must be at least 3 characters' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (password.length < 8) return new Response(JSON.stringify({ message: 'Password must be at least 8 characters' }), {    
            headers: { 'Content-Type': 'application/json' },
        })

        if (password != confirmPassword) return new Response(JSON.stringify({ message: 'Password does not match' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        await connectDB()
        await Register.create({ name, password, username })

        return new Response(JSON.stringify({ message: 'User account created' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ message: "hello" + error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export { POST }