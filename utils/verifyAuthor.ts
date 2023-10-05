import Register from "@/models/auth/Register"
import bcrypt from 'bcrypt'

const verifyAuthor = async (author: string, userId: string) => {
    const authorData = await Register.findOne(
        { 'username': author }
    )

    if (!authorData) return false

    const isAuthor = await bcrypt.compare(authorData._id.toString(), userId)

    return isAuthor
}

export { verifyAuthor }