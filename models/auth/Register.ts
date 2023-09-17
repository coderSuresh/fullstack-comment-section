import { Schema, model, models } from 'mongoose'

const RegisterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
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

const Register = models.Register || model('Register', RegisterSchema)
export default Register