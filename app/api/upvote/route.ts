import CommentModel from "@/models/Comment"
import Register from "@/models/auth/Register"
import { connectDB } from "@/utils/database"

const PUT = async (req: Request) => {
    try {

        const { vote, id, commentID, username, author } = await req.json()
        let userId;

        await connectDB()

        try {
            const user = await Register.findOne(
                { 'username': username },
            )

            if (!user) return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))
            if (user.username === author) return new Response(JSON.stringify({ 'error': 'You cannot vote on your own comment!' }))
            userId = user._id

        } catch (err) {
            return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))
        }

        try {
            // if it is a comment
            let comment = await CommentModel.findOne(
                { '_id': id },
            )

            if (vote === 'up') {

                if (comment.downVotedBy.includes(userId)) {
                    comment.downVotedBy.splice(comment.downVotedBy.indexOf(userId), 1)
                }

                if (comment.upVotedBy.includes(userId))
                    return new Response(JSON.stringify({ 'error': 'You have already upvoted this comment!' }))

                comment.score++
                comment.upVotedBy.push(userId)
            }
            else if (vote === 'down') {

                if (comment.upVotedBy.includes(userId)) {
                    comment.upVotedBy.splice(comment.upVotedBy.indexOf(userId), 1)
                }

                if (comment.downVotedBy.includes(userId))
                    return new Response(JSON.stringify({ 'error': 'You have already downvoted this comment!' }))

                comment.score--
                comment.downVotedBy.push(userId)
            }

            const updated = await CommentModel.updateOne(
                { '_id': id },
                { $set: { score: comment.score, upVotedBy: comment.upVotedBy, downVotedBy: comment.downVotedBy } }
            )

            if (updated.modifiedCount) return new Response(JSON.stringify({ 'success': 'Vote updated!', 'score': comment.score }))
            else return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' }))
        } catch (err) {
            // if it is a reply
            let comment = await CommentModel.findOne(
                { '_id': commentID },
            )

            let replies = comment.replies

            const replyIndex = replies.findIndex((reply: any) => reply._id.toString() === id)

            if (vote === 'up') {

                if (replies[replyIndex].downVotedBy.includes(userId)) {
                    replies[replyIndex].downVotedBy.splice(replies[replyIndex].downVotedBy.indexOf(userId), 1)
                }

                if (replies[replyIndex].upVotedBy.includes(userId))
                    return new Response(JSON.stringify({ 'error': 'You have already upvoted this reply!' }))

                replies[replyIndex].score++
                replies[replyIndex].upVotedBy.push(userId)
            } else if (vote === 'down') {

                if (replies[replyIndex].upVotedBy.includes(userId)) {
                    replies[replyIndex].upVotedBy.splice(replies[replyIndex].upVotedBy.indexOf(userId), 1)
                }

                if (replies[replyIndex].downVotedBy.includes(userId))
                    return new Response(JSON.stringify({ 'error': 'You have already downvoted this reply!' }))

                replies[replyIndex].score--
                replies[replyIndex].downVotedBy.push(userId)
            }

            const updated = await CommentModel.updateOne(
                { '_id': commentID },
                { $set: { replies: replies } }
            )

            if (updated.modifiedCount) return new Response(JSON.stringify({ 'success': 'Vote updated!', 'score': replies[replyIndex].score }))
            else return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' }))
        }

    } catch (err) {
        return new Response(JSON.stringify({ 'error': 'Could not update vote. Please try again!' + err }))
    }
}

export { PUT }