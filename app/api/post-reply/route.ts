import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"
import mongoose from "mongoose"

const PUT = async (req: Request) => {
    try {
        const replyObj = await req.json()

        const replyToBeAdded = JSON.stringify({
            _id: new mongoose.Types.ObjectId(),
            comment: replyObj.comment,
            createdAt: replyObj.createdAt,
            replyTo: replyObj.replyTo,
            commendID: replyObj.commentID,
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