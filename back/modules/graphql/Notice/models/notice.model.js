import { Schema, model } from "mongoose";

const noticeSchema = new Schema({
    project: String,
    title: String,
    from: String,
    to: String,
    content: String,
    time: String,
})

const Notice = model('notice', noticeSchema);

export default Notice;