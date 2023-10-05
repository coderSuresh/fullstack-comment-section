import { connectDB } from "@/utils/database"
import Register from "@/models/auth/Register"
import bcrypt from "bcrypt"

const POST = async (req: Request) => {
    try {
        const { username, password } = await req.json()

        await connectDB()

        const dbUserData = await Register.findOne({
            'username': username
        })

        if (!username || !password) return new Response(JSON.stringify({ error: 'All fields are required' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        if (!dbUserData) return new Response(JSON.stringify({ error: 'Username does not exist' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        const isPasswordCorrect = await bcrypt.compare(password, dbUserData.password)

        if (!isPasswordCorrect) return new Response(JSON.stringify({ error: 'Password is incorrect' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        const hashedId = await bcrypt.hash(dbUserData._id.toString(), 10)

        return new Response(JSON.stringify(
            {
                message: 'User logged in',
                username: dbUserData.username,
                name: dbUserData.name,
                id: hashedId,
                isLoggedIn: true,
            }
        ), {
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