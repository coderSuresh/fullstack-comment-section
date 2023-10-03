import CommentModel from "@/models/Comment"
import Register from "@/models/auth/Register"
import { connectDB } from "@/utils/database"

const PUT = async (req: Request) => {
    try {

        const { vote, id, commentID, username, author } = await req.json()

        await connectDB()

        try {
            const user = await Register.findOne(
                { 'username': username },
            )

            if (!user) return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))

            if(user.username === author) return new Response(JSON.stringify({ 'error': 'You cannot vote on your own comment!' }))

        } catch (err) {
            return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))
        }

        try {
            // if it is a comment
            let comment = await CommentModel.findOne(
                { '_id': id },
            )

            if (vote === 'up') {
                comment.score++
            }
            else if (vote === 'down') {
                comment.score--
            }

            const updated = await CommentModel.updateOne(
                { '_id': id },
                { $set: { score: comment.score } }
            )

            if (updated.modifiedCount) return new Response(JSON.stringify({ 'success': 'Vote updated!' }))
            else return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' }))
        } catch (err) {
            // if it is a reply
            let comment = await CommentModel.findOne(
                { '_id': commentID },
            )

            let replies = comment.replies

            const replyIndex = replies.findIndex((reply: any) => reply._id.toString() === id)

            if (vote === 'up') {
                replies[replyIndex].score++
            } else if (vote === 'down') {
                replies[replyIndex].score--
            }

            const updated = await CommentModel.updateOne(
                { '_id': commentID },
                { $set: { replies: replies } }
            )

            if (updated.modifiedCount) return new Response(JSON.stringify({ 'success': 'Vote updated!' }))
            else return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' }))
        }

    } catch (err) {
        return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' }))
    }
}

export { PUT }