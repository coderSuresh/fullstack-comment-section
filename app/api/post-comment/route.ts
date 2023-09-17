import CommentModel from "@/models/Comment"
import { connectDB } from "@/utils/database"

const POST = async (req: Request) => {
    try {
        const content = await req.json()
        await connectDB()
        await CommentModel.create(content)
        return new Response(JSON.stringify({message: 'commented successfully'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), { status: 500 })
    }
}

export { POST }