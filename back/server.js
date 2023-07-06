//External Imports
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from "apollo-server-express"
import mongoose from "./config/database.js";
import typeDefs from "./modules/graphql/graphqlSchema.js";
import resolvers from "./modules/graphql/resolvers.js";
import session from "express-session";
import { MemoryStore } from "express-session";
import cors from "cors";

//Local Imports
import Info from "./ServiceInformation.js"

const server = new ApolloServer({typeDefs,resolvers});;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await server.start(console.log('Apollo server started successfully'));
server.applyMiddleware({app});

app.set('port', 3000)

app.use(express.static(path.join(__dirname, '../front/build')));
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
app.use(session({
    secret: Info.encryptKey,
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        path: '/',
        httpOnly: 'true',
        secure: 'false',
        maxAge: null
    }
}));
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}${server.graphqlPath}`);
})

app.get('/', (req,res) => {
    res.send(express.static(path.join(__dirname, '../../front/build/index.html')));
})

app.post('/setLoginInfo', (req,res) =>{
    console.log(req.body);

    req.session.user = req.body;
    console.log(req.session)

    res.json({body: req.body});
})

app.get('/')
