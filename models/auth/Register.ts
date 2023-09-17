import { Schema, model, models } from 'mongoose'

const RegisterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },

    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
})

const Register = models.Users || model('Users', RegisterSchema)
export default Register