import { Schema, model, models } from 'mongoose'

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0
    },
    replies: {
        type: Array,
        default: []
    },
})

const CommentModel = models.Comment || model('Comment', CommentSchema)
export default CommentModel