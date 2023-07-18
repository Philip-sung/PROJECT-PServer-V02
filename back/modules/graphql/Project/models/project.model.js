import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: String,
    designer: String,
    status: String,
    funding: Number,
    started: String,
    completed: String,
    progress: Number,
    privilege: String,
    link: String,
    member: [String],
    tech: [String],
    thumbnail: String,
    description: String,
    reference: String
})

const Project = model('project', projectSchema);

export default Project;