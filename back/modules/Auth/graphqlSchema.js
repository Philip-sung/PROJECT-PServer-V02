import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Auth {
        _id: ID,
        userID: String!,
        userPW: String!,
        userName: String!,
        credit: Int!,
        privilege: String!
    },
    type Query {
        auths: [Auth],
        login(userID: String!, userPW: String!) : Auth
    },
    type Mutation {
        signIn(userID: String!, userPW: String!, userName: String!) : Auth
    }
`;

export default typeDefs;