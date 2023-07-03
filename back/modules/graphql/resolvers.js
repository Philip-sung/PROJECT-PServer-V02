import Auth from "./Auth/models/auth.model.js";
import Post from "./Post/models/post.model.js";

const resolvers = {
    Query: {
        getAllUsers : async () => {
            const users = await Auth.find({});
            return users;
        },
        getUserInfo : async (parent, args, contextValue, info) => {
            const curTime = new Date();
            const user = await Auth.findOne({ userID: args.userID, userPW: args.userPW });
            console.log(`Login Attempt on [ID:${args.userID}] at [${curTime.getFullYear()}.${curTime.getMonth() + 1}.${curTime.getDate()} ${curTime.getHours()}:${curTime.getMinutes()}:${curTime.getSeconds()}]`)
            if(args.userPW === user?.userPW){
                console.log(`*Login Attempt Above Succeeded`)
            }
            return user;
        },

        getAllPosts : async () => {
            const posts = await Post.find({});
            return posts;
        },
        getPostbyID : async (parent, args, contextValue, info) => {
            const posts = await Post.findById(args.postID);
            return posts;
        },
        getPostsbyTitle : async (parent, args, contextValue, info) => {
            const query = new RegExp(args.postTitle);
            const posts = await Post.find({postTitle: query});
            return posts
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