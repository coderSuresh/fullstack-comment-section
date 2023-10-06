import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"

const DELETE = async (req: Request) => {
    try {
        const { commentID } = await req.json()

        await connectDB()

        try {
            const comment = await CommentModel.findOne(
                { '_id': commentID },
            )

            if (!comment) return new Response(JSON.stringify({ 'error': 'Comment not found!' }))

            await CommentModel.deleteOne({ '_id': commentID })

            return new Response(JSON.stringify({ 'success': 'Comment deleted successfully!' }))
        } catch (err) {
            return new Response(JSON.stringify({ 'error': 'Something went wrong! Please try again!' }))
        }

    } catch (err) {
        return new Response(JSON.stringify({ 'error': 'Something went wrong! Please try again!' }))
    }
}

export { DELETE }