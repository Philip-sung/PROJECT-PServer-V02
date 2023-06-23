import { Schema, model } from "mongoose";

const authSchema = new Schema({
    userID: String,
    userPW: String
})

const Auth = model('auth', authSchema);

export default Auth;