import Auth from "./Auth/models/auth.model.js";
import Post from "./Post/models/post.model.js";

const resolvers = {
    Query: {
        getAllUsers : async () => {
            const users = await Auth.find({});
            return users;
        },
        getUserInfo : async (parent, args, contextValue, info) => {
            const user = await Auth.findOne({ userID: args.userID, userPW: args.userPW });
            return user;
        },

        getAllPosts : async () => {
            const posts = await Post.find({});
            return posts;
        },
        getPostbyTitle : async (parent, args, contextValue, info) => {
            const posts = await Post.find({title: /args.title/})
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const newAuth = new Auth({
                userID: args.userID,
                userPW: args.userPW,
                userName: args.userName,
                credit: args.credit,
                privilege: args.privilege
            });
            return newAuth.save();
        },
        createPost: (parent, args, contextValue, info) => {
            const newPost = new Post({
                postTitle: args.postTitle,
                postContent: args.postContent,
                postDate: args.postDate,
                postWriter: args.postWriter,
                thumbnail: args.thumbnail,
                category:args.category,
                tag: args.tag
            });
            return newPost.save();
        }
    }
}


export default resolvers;