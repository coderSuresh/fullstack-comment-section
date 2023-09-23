import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"

export const revalidate = 0

const GET = async () => {
    try {
        await connectDB()
        const comments = await CommentModel.find({})

        if (!comments) {
            return new Response(JSON.stringify({ error: "No comments found" }))
        }

        return new Response(JSON.stringify(comments))
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error }))
    }
}

export { GET }