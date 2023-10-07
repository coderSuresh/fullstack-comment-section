import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"
import { CommentProps } from "@/types/props"

const PUT = async (req: Request) => {
    try {
        const { id, commentId, comment } = await req.json()

        await connectDB()

        const commentToEdit = await CommentModel.findOne({ _id: id })

        if (!commentToEdit) {
            // user is editing a reply
            const parentComment = await CommentModel.findOne(
                { '_id': commentId }
            )

            if (!parentComment) {
                return new Response(JSON.stringify({ error: 'Comment not found!' }))
            }

            const reply = parentComment.replies.find((reply: CommentProps) => reply._id == id)

            if (!reply) {
                return new Response(JSON.stringify({ error: 'Reply not found!' }))
            }

            reply.comment = comment

            const updated = await CommentModel.updateOne(
                { _id: commentId },
                { $set: { replies: parentComment.replies } }
            )

            if (!updated.matchedCount) return new Response(JSON.stringify({ error: 'Could not update comment. Please try again.' }))

            return new Response(JSON.stringify({ success: 'Commment updated successfully.' }))
        }

        commentToEdit.comment = comment
        await commentToEdit.save()
        return new Response(JSON.stringify({ success: 'Comment updated successfully!' }))

    } catch (error) {
        new Response(JSON.stringify({ error: 'Something went wrong! Please try again.' }))
    }
}

export { PUT }