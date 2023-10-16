import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
    project: String,
    createdTime: String,
    startTime: String,
    endTime: String,
    proposer: String,
    content: String,
    member: [String]
})

const Schedule = model('schedule', scheduleSchema);

export default Schedule;