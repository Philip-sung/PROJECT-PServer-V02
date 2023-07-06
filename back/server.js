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
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
    }),
    cookie: {
        maxAge: 86400000
    }
}));

//!START! : CORS CODE FOR TEST ENVIRONMENT
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));
//!END! : CORS CODE FOR TEST ENVIRONMENT

app.get('/', (req,res) => {
    res.send(express.static(path.join(__dirname, '../../front/build/index.html')));
})

app.post('/setLoginInfo', (req,res) =>{
    req.session.user = req.body;
    res.json({body: req.session.user});
})

app.get('/getLoginInfo', (req,res) =>{
    const loginInfo = req.session.user;
    res.json({body: loginInfo});
})

app.get('/logout', (req,res) =>{
    req.session.destroy();
})

app.listen(app.get('port'), () => {
    console.log(`Server running on http://localhost:${app.get('port')}${server.graphqlPath}`);
})
