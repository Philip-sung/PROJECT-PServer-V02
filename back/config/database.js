import mongoose from "mongoose";
import Info from "../ServiceInformation.js";

const DB_URI = Info.databaseURI;

mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', error => console.error(error));

export default mongoose;