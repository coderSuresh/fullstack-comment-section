import Register from '@/models/auth/Register'
import { connectDB } from '@/utils/database'
import bcrypt from 'bcrypt'

const POST = async (req: Request) => {

    try {
        let { name, password, confirmPassword, username } = await req.json()

        if (!name || !password || !username) return new Response(JSON.stringify({ error: 'All fields are required' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (name.length < 3) return new Response(JSON.stringify({ error: 'Name must be at least 3 characters' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (password.length < 8) return new Response(JSON.stringify({ error: 'Password must be at least 8 characters' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (password != confirmPassword) return new Response(JSON.stringify({ error: 'Password does not match' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        await connectDB()

        const userWithSameUsername = await Register.findOne({
            'username': username
        })

        if (userWithSameUsername) return new Response(JSON.stringify({ error: 'Username already exists' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        password = await bcrypt.hash(password, 10)

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