import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"

const POST = async (req: Request) => {
    try {
        const content = await req.json()
        await connectDB()
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