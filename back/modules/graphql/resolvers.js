import Auth from "./Auth/models/auth.model.js";
import Post from "./Post/models/post.model.js";
import Log from "./Log/models/log.model.js";
import Project from "./Project/models/project.model.js";
//import CryptoJS from 'crypto-js';

const resolvers = {
    Query: {
        //Auth
        getAllUsers : async () => {
            const users = await Auth.find({});
            return users;
        },
        getUser : async (parent, args, contextValue, info) => {
            const user = await Auth.find({ userID: {$in: args.userID} })
            return user;
        },
        getUserInfo : async (parent, args, contextValue, info) => {
            const curTime = new Date();
            const user = await Auth.findOne({ userID: args.userID, userPW: args.userPW });
            console.log(`[USER]Login Attempt on [ID:${args.userID}] at [${curTime.getFullYear()}.${curTime.getMonth() + 1}.${curTime.getDate()} ${curTime.getHours()}:${curTime.getMinutes()}:${curTime.getSeconds()}]`)
            const log = await Log.create({logTime: Date(), log: `Login Attempt on [ID:${args.userID}] at [${curTime.getFullYear()}.${curTime.getMonth() + 1}.${curTime.getDate()} ${curTime.getHours()}:${curTime.getMinutes()}:${curTime.getSeconds()}]`});
            if(args.userPW === user?.userPW){
                console.log(`[USER]Successful Login Attempt on [ID:${args.userID}]`)
                const log = await Log.create({logTime: Date(), log: `[USER]Successful Login Attempt on [ID:${args.userID}]`});
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
        getAllProjects : async (parent, args, contextValue, info) => {
            const projects = await Project.find({});
            return projects;
        },
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
        },
        createProject: (parent, args, contextValue, info) => {
            const newProject = new Project({
                title: args.title,
                designer: args.designer,
                status: args.status,
                funding: args.funding,
                started: args.started,
                completed: args.completed,
                progress: args.progress,
                privilege: args.privilege,
                link: args.link,
                member: args.member,
                tech: args.tech,
                thumbnail: args.thumbnail,
                description: args.description,
                reference: args.reference
            });
            return newProject.save();
        }
    }
}

/*
function newAuth(id, pw, name, credit, privilege){
    const pw_e = CryptoJS.SHA512(pw).toString().toUpperCase();
    const newAuth = new Auth({
        userID: id,
        userPW: pw_e,
        userName: name,
        credit: credit,
        privilege: privilege
    });
    newAuth.save();
}
newAuth("PhilipSung", "0628", "Owner", 0, "Owner");
*/
/*
function insertNew(){
    const newProject = new Project({
        title: "robotics",
        status: "inProgress",
        funding: 0,
        started: "2023-01-01",
        completed: "",
        progress: 10,
        privilege: "Family",
        link: "robotics.com",
        member: ["SungPhil"],
        tech: ["ReactNative","Mobx","AWS"],
        thumbnail: "robotics",
        description: "Robotics Project",
        reference: "none"
    });
    newProject.save();
}
insertNew();
*/
/*
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
        thumbnail: "BioIndel",
        description: "Bioindel Project",
        reference: "none"
    });
    newProject.save();
}
insertCompleted();*/


export default resolvers;