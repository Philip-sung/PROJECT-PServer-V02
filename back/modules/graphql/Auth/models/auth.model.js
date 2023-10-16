import { Schema, model } from "mongoose";

const authSchema = new Schema({
    userID: String,
    userPW: String,
    userName: String,
    credit: Number,
    privilege: String,
    project: [String]
})

const Auth = model('auth', authSchema);

export default Auth;