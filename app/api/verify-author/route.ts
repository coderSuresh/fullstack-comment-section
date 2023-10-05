import { connectDB } from "@/utils/database"
import { verifyAuthor } from "@/utils/verifyAuthor"
import { verifyUsername } from "@/utils/verifyUsername"

const POST = async (req: Request) => {
    try {
        const { username, userId, author } = await req.json()

        await connectDB()

        const isLoggedIn = await verifyUsername(username, userId)

        if (!isLoggedIn) return new Response(JSON.stringify({ error: 'You are not authorized! Please login.' }))

        const isAuthor = await verifyAuthor(author, userId)

        return new Response(JSON.stringify({ 'isAuthor': isAuthor }))

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Something went wrong! Please try again.' }))
    }
}

export { POST }