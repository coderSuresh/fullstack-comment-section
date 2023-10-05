import CommentModel from "@/models/Comment"
import Register from "@/models/auth/Register"
import { connectDB } from "@/utils/database"
import bcrypt from "bcrypt"

const POST = async (req: Request) => {
    try {
        const content = await req.json()
        await connectDB()

        // get userData from database using username from localStorage
        const dbUserData = await Register.findOne({
            'username': content.author
        })

        if (!dbUserData) return new Response(JSON.stringify({ error: 'Username does not exist' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        // compare id from database
        const doesIdMatch = await bcrypt.compare(dbUserData._id.toString(), content.userId)

        if (dbUserData && !doesIdMatch) return new Response(JSON.stringify({ error: 'Username does not exist' }), {
            headers: { 'Content-Type': 'application/json' },
        })

        await CommentModel.create(content)

        const newComment = await CommentModel.findOne({
            $and: [
                { username: content.username },
                { comment: content.comment },
                { createdAt: content.createdAt }
            ]
        })

        return new Response(JSON.stringify({ newComment: newComment }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 })
    }
}

export { POST }