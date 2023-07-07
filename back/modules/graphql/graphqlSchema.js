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
    type Post {
        _id: ID!,
        postTitle: String!,
        postContent: String!,
        postDate: String!,
        postWriter: String!,
        thumbnail: String,
        category: String,
        tag: String
    },
    type Log {
        _id: ID,
        logTime: String!,
        log: String!
    },
    
    type Query {
        getAllUsers: [Auth],
        getUserInfo(userID: String!, userPW: String!) : Auth

        getAllPosts: [Post],
        getPostsbyTitlePaginated(postTitle: String!, offset: Int!, limit: Int!): [Post],
        getPostsbyTitle(postTitle: String!): [Post],
        getPostbyID(postID: String!): Post,
    },
    type Mutation {
        createUser(
            userID: String!, 
            userPW: String!, 
            userName: String!
        ) : Auth
        createPost(
            postTitle: String!,
            postContent: String!,
            postDate: String!,
            postWriter: String!,
            thumbnail: String,
            category: String,
            tag: String
        ) :  Post
    }
`;

export default typeDefs;