import bcrypt from 'bcrypt'
import Register from '@/models/auth/Register'

const verifyUsername = async (username: string, userId: string) => {

    // get userData from database using username from localStorage
    const dbUserData = await Register.findOne({
        'username': username
    })

    if (!dbUserData) return false

    // compare id from database
    const doesIdMatch = await bcrypt.compare(dbUserData._id.toString(), userId)

    return doesIdMatch
}

export { verifyUsername }