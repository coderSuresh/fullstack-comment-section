import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"
import { verifyUsername } from "@/utils/verifyUsername"
import mongoose from "mongoose"

const PUT = async (req: Request) => {
    try {
        const replyObj = await req.json()

        const replyToBeAdded = {
            _id: new mongoose.Types.ObjectId(),
            comment: replyObj.comment,
            createdAt: replyObj.createdAt,
            replyTo: replyObj.replyTo,
            commentID: replyObj.commentID,
            author: replyObj.author,
            score: 0,
            upVotedBy: [],
            downVotedBy: [],
        }

        await connectDB()

        const isVerified = await verifyUsername(replyObj.author, replyObj.userId)
        
        if (!isVerified) {
            return new Response(JSON.stringify({ error: "You are not authorized! Please login!" }))
        }

        try {
            await CommentModel.updateOne(
                { _id: replyObj.commentID },
                { $push: { replies: replyToBeAdded } }
            )
            return new Response(JSON.stringify({ message: "Reply added successfully", newReply: replyToBeAdded }))
        } catch (err) {
            return new Response(JSON.stringify({ error: "Something went wrong!" }))
        }
    }
    catch (err) {
        return new Response(JSON.stringify({ error: "Sorry, " + err }))
    }
}

export { PUT }