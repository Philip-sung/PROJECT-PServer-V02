import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Auth {
        _id: ID,
        userID: String!,
        userPW: String!,
        userName: String!,
        credit: Int!,
        privilege: String!,
        project: [String]
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
    type Project {
        _id: ID,
        title: String,
        designer: String,
        status: String,
        funding: Int,
        started: String,
        completed: String,
        progress: Int,
        privilege: String,
        link: String,
        member: [String],
        tech: [String],
        thumbnail: String,
        description: String,
        reference: String,
    },
    
    type Query {
        getAllUsers: [Auth],
        getUser(userID: [String]): [Auth],
        getUserInfo(userID: String!, userPW: String!): Auth

        getAllPosts: [Post],
        getPostsbyTitlePaginated(postTitle: String!, offset: Int!, limit: Int!): [Post],
        getPostsbyTitle(postTitle: String!): [Post],
        getPostbyID(postID: String!): Post,

        getProjectsbyStatus(status: String): [Project],
        getAllProjects : [Project],
    },

    type Mutation {
        createUser(
            userID: String!, 
            userPW: String!, 
            userName: String!
        ) : Auth,
        createPost(
            postTitle: String!,
            postContent: String!,
            postDate: String!,
            postWriter: String!,
            thumbnail: String,
            category: String,
            tag: String
        ) :  Post,
        createProject(
            title: String,
            designer: String,
            status: String,
            funding: Int,
            started: String,
            completed: String,
            progress: Int,
            privilege: String,
            link: String,
            member: [String],
            tech: [String],
            thumbnail: String,
            description: String,
            reference: String,
        ) : Project
    }
`;

export default typeDefs;