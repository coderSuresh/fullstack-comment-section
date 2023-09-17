import Register from '@/models/auth/Register'
import { connectDB } from '@/utils/database'

const POST = async (req: Request) => {

    try {
        const { name, email, password, username } = await req.json()
        await connectDB()
        await Register.create({ name, email, password, username })

        return new Response(JSON.stringify({ message: 'User account created' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export { POST }