import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"
import { CommentProps } from "@/types/props"

const DELETE = async (req: Request) => {
    try {
        const { id, commentID } = await req.json()

        await connectDB()

        try {
            const comment = await CommentModel.findOne(
                { '_id': id },
            )

            if (!comment) {
                // user is trying to delete a reply
                const parentComment = await CommentModel.findOne(
                    { _id: commentID, },
                )

                if (!parentComment) {
                    return new Response(JSON.stringify({ 'error': 'Comment not found!' }))
                }

                const reply = parentComment.replies.find((reply: CommentProps) => reply._id == id)

                if (!reply) {
                    return new Response(JSON.stringify({ 'error': 'Comment not found!' }))
                }

                const replyIndex = parentComment.replies.findIndex((reply: CommentProps) => reply._id == id)

                parentComment.replies.splice(replyIndex, 1)

                await parentComment.save()

                return new Response(JSON.stringify({ 'success': 'Comment deleted successfully!', 'isReply': true }))
            } else {
                await CommentModel.deleteOne({ _id: id })
            }

            return new Response(JSON.stringify({ 'success': 'Comment deleted successfully!' }))
        } catch (err) {
            return new Response(JSON.stringify({ 'error': 'Something went wrong! Please try again!' }))
        }

    } catch (err) {
        return new Response(JSON.stringify({ 'error': 'Something went wrong! Please try again!' }))
    }
}

export { DELETE }