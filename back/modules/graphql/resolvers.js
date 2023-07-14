import Auth from "./Auth/models/auth.model.js";
import Post from "./Post/models/post.model.js";
import Log from "./Log/models/log.model.js";
import Project from "./Project/models/project.model.js";

const resolvers = {
    Query: {
        //Auth
        getAllUsers : async () => {
            const users = await Auth.find({});
            return users;
        },
        getUserInfo : async (parent, args, contextValue, info) => {
            const curTime = new Date();
            const user = await Auth.findOne({ userID: args.userID, userPW: args.userPW });
            console.log(`Login Attempt on [ID:${args.userID}] at [${curTime.getFullYear()}.${curTime.getMonth() + 1}.${curTime.getDate()} ${curTime.getHours()}:${curTime.getMinutes()}:${curTime.getSeconds()}]`)
            const log = await Log.create({logTime: Date(), log: `Login Attempt on [ID:${args.userID}] at [${curTime.getFullYear()}.${curTime.getMonth() + 1}.${curTime.getDate()} ${curTime.getHours()}:${curTime.getMinutes()}:${curTime.getSeconds()}]`});
            if(args.userPW === user?.userPW){
                console.log(`*Login Attempt Above Succeeded`)
                const log = await Log.create({logTime: Date(), log: `*Login Attempt Above Succeeded`});
            }
            return user;
        },
        //Post
        getAllPosts : async () => {
            const posts = await Post.find({}).sort({ postDate : -1 });
            return posts;
        },
        getPostsbyTitlePaginated : async (parent, args, contextValue, info) => {
            const query = new RegExp(args.postTitle);
            const posts = await Post.find({postTitle: query})
                .sort({ postDate : -1 })
                .skip(args.offset)
                .limit(args.limit);
            return posts
        },
        getPostsbyTitle : async (parent, args, contextValue, info) => {
            const query = new RegExp(args.postTitle);
            const posts = await Post.find({postTitle: query}).sort({ postDate : -1 });
            return posts
        },
        getPostbyID : async (parent, args, contextValue, info) => {
            const posts = await Post.findById(args.postID);
            return posts;
        },
        //Project
        getProjectsbyStatus : async (parent, args, contextValue, info) => {
            const projects = await Project.find({status: args.status});
            return projects;
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

/*
function insertNew(){
const newProject = new Project({
    title: "DatePlaylist",
    status: "inProgress",
    funding: 0,
    started: "2023-01-01",
    completed: "",
    progress: 10,
    privilege: "Family",
    link: "DatePlaylist.com",
    member: ["SungChun", "SungPhil"],
    tech: ["ReactNative","Mobx","AWS"],
    thumbnail: "Daply"
});
newProject.save();}

insertNew();


function insertCompleted(){
const newProject = new Project({
    title: "BioIndel",
    status: "Completed",
    funding: 0,
    started: "2023-01-01",
    completed: "2023-04-01",
    progress: 100,
    privilege: "Best Friend",
    link: "BioIndel.com",
    member: ["SeokHoon Lee", "SungPhil"],
    tech: ["Python"],
    thumbnail: "BioIndel"
});
newProject.save();}

insertCompleted();*/


export default resolvers;