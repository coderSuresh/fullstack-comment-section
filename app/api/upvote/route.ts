import CommentModel from "@/models/Comment"
import Register from "@/models/auth/Register"
import { connectDB } from "@/utils/database"
import { verifyUsername } from "@/utils/verifyUsername"

const PUT = async (req: Request) => {
    try {

        const { vote, id, commentID, hashedUserId, username, author } = await req.json()
        let userId: string;

        await connectDB()

        try {
            const user = await Register.findOne(
                { 'username': username },
            )

            const isVerified = await verifyUsername(hashedUserId, user._id.toString())

            if (!isVerified) {
                return new Response(JSON.stringify({ error: "You are not authorized! Please login!" }))
            }

            if (!user) return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))
            if (user.username === author) return new Response(JSON.stringify({ 'error': 'You cannot vote on your own comment!' }))
            userId = user._id

        } catch (err) {
            return new Response(JSON.stringify({ 'error': 'Please login to continue!' }))
        }

        const dotSomeLogic = (id: string) => id.toString() === userId.toString()

        try {
            // if it is a comment
            let comment = await CommentModel.findOne(
                { '_id': id },
            )

            if (vote === 'up') {
                if (comment.upVotedBy.some(dotSomeLogic)) {
                    return new Response(JSON.stringify({ 'error': 'You have already upvoted this comment!' }))
                }

                if (comment.downVotedBy.some(dotSomeLogic)) {
                    comment.score++
                    comment.downVotedBy.splice(comment.downVotedBy.indexOf(userId), 1)
                } else {
                    comment.score++
                    comment.upVotedBy.push(userId)
                }
            }
            else if (vote === 'down') {
                if (comment.downVotedBy.some(dotSomeLogic))
                    return new Response(JSON.stringify({ 'error': 'You have already downvoted this comment!' }))

                if (comment.upVotedBy.some(dotSomeLogic)) {
                    comment.score--
                    comment.upVotedBy.splice(comment.upVotedBy.indexOf(userId), 1)
                } else {
                    comment.score--
                    comment.downVotedBy.push(userId)
                }
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

            const replyIndex = replies.findIndex((reply: any) => reply._id.toString() === id) as number

            if (vote === 'up') {

                if (replies[replyIndex].upVotedBy.some(dotSomeLogic))
                    return new Response(JSON.stringify({ 'error': 'You have already upvoted this reply!' }))

                if (replies[replyIndex].downVotedBy.some(dotSomeLogic)) {
                    replies[replyIndex].score++
                    replies[replyIndex].downVotedBy.splice(replies[replyIndex].downVotedBy.indexOf(userId), 1)
                } else {
                    replies[replyIndex].score++
                    replies[replyIndex].upVotedBy.push(userId)
                }
            } else if (vote === 'down') {

                if (replies[replyIndex].downVotedBy.some(dotSomeLogic))
                    return new Response(JSON.stringify({ 'error': 'You have already downvoted this reply!' }))


                if (replies[replyIndex].upVotedBy.some(dotSomeLogic)) {
                    replies[replyIndex].score--
                    replies[replyIndex].upVotedBy.splice(replies[replyIndex].upVotedBy.indexOf(userId), 1)
                } else {
                    replies[replyIndex].score--
                    replies[replyIndex].downVotedBy.push(userId)
                }
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