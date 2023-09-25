import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"

const PUT = async (req: Request) => {
    try {
        const replyObj = await req.json()

        const replyToBeAdded = JSON.stringify({
            comment: replyObj.comment,
            createdAt: replyObj.createdAt,
            replyTo: replyObj.replyTo,
            author: replyObj.author,
        })

        await connectDB()

        try {
            await CommentModel.updateOne(
                { _id: replyObj.commentID },
                { $push: { replies: replyToBeAdded } }
            )
            return new Response(JSON.stringify({ message: "Reply added successfully" }))
        } catch (err) {
            return new Response(JSON.stringify({ error: "Something went wrong!" }))
        }
    }
    catch (err) {
        return new Response(JSON.stringify({ error: "Sorry, " + err }))
    }
}

export { PUT }