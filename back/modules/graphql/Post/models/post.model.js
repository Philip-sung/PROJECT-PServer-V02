import { Schema, model } from "mongoose";

const postSchema = new Schema({
    postTitle: String,
    postContent: String,
    postDate: String,
    postWriter: String,
    project: String,
    category: String,
    tag: String
})

const Post = model('post', postSchema);

export default Post;