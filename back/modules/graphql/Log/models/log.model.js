import { Schema, model } from "mongoose";

const logSchema = new Schema({
    logTime: String,
    log : String
})

const Log = model('log', logSchema)

export default Log;