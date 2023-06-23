import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Auth {
        _id: ID,
        userID: String,
        userPW: String
    },
    type Query {
        auths: [Auth]
    },
    type Mutation {
        signIn(userID: String!, userPW: String!) : Auth
    }
`;

export default typeDefs;