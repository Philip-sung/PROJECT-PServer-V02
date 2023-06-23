import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from "apollo-server-express"
import mongoose from "./config/database.js";
import typeDefs from "./modules/Auth/graphqlSchema.js";
import resolvers from "./modules/Auth/resolvers.js";

const server = new ApolloServer({typeDefs,resolvers});;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await server.start(console.log('Apollo server started successfully'));
server.applyMiddleware({app});

app.set('port', 80)
app.use(express.static(path.join(__dirname, '../front/build')));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}`);
})

app.get('/', (req,res) => {
    res.send(express.static(path.join(__dirname, '../../front/build/index.html')));
})