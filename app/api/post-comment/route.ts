import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"
import { verifyUsername } from "@/utils/verifyUsername"

const POST = async (req: Request) => {
    try {
        const content = await req.json()
        await connectDB()

        const isVerified = await verifyUsername(content.username, content.userId)

        if (!isVerified) {
            return new Response(JSON.stringify({ error: "You are not authorized! Please login!" }))
        }

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