import Auth from "./Auth/models/auth.model.js";
import Post from "./Post/models/post.model.js";
import Log from "./Log/models/log.model.js";
import Project from "./Project/models/project.model.js";
import Notice from "./Notice/models/notice.model.js";
import Schedule from "./Schedule/schedule.model.js";
//import CryptoJS from 'crypto-js';

const resolvers = {
    Query: {
        //Auth
        getAllUsers : async () => {
            const users = await Auth.find({});
            return users;
        },
        getUser : async (parent, args, contextValue, info) => {
            const user = await Auth.findOne({ userID: args.userID })
            return user;
        },
        getUsers : async (parent, args, contextValue, info) => {
            const users = await Auth.find({ userID: {$in: args.userID} })
            return users;
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
            const query = new RegExp(args.postTitle, "i");
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
        modifyPostbyID : async (parent, args, contextValue, info) => {
            const query = { $set : {postTitle: args.postTitle, postContent: args.postContent, project: args.project}}
            const post = await Post.findByIdAndUpdate(args.postID, query)
        },

        //Project
        getAllProjects : async (parent, args, contextValue, info) => {
            const projects = await Project.find({}).sort({ started : -1 });
            return projects;
        },
        getProjectsbyStatus : async (parent, args, contextValue, info) => {
            const projects = await Project.find({status: args.status}).sort({ started : -1 });
            return projects;
        },
        getProjectbyTitle : async (parent, args, contextValue, info) => {
            const project = await Project.findOne({title: args.title}).sort({ started : -1 });
            return project;
        },
        getProjectbyID : async (parent, args, contextValue, info) => {
            const project = await Project.findById(args.projectID);
            console.log(project)
            return project;
        },

        //Notice
        getUserNotice: async (parent, args, contextValue, info) => {
            const notices = await Notice.find({to: args.userID}).sort({ time : -1 });
            return notices;
        },

        //Schedule
        getSchedulebyProjectAndMember: async (parent, args, contextValue, info) => {
            const schedule = await Schedule.find({project: args.project, member: args.member}).sort({startTime: -1, createdTime: -1});
            return schedule;
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
        createPost: async (parent, args, contextValue, info) => {
            const newPost = new Post({
                postTitle: args.postTitle,
                postContent: args.postContent,
                postDate: args.postDate,
                postWriter: args.postWriter,
                project: args.project,
                category:args.category,
                tag: args.tag
            });

            const relatedProject = await Project.findOne({title: args.project});
            if(relatedProject !== undefined && relatedProject !== null){
                for(let i = 0; i < relatedProject.member.length; i++){
                    const notice = new Notice({
                        project: args.project,
                        title: args.project,
                        from: args.postWriter,
                        to: relatedProject.member[i],
                        content: `${args.postWriter} posted new post "${args.postTitle}" on project "${args.project}"`,
                        time: args.postDate,
                    })
                    notice.save();
                }
            }

            return newPost.save();
        },
        createProject: async (parent, args, contextValue, info) => {
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
                reference: args.reference,
                location: args.location
            });

            for(let i = 0; i < args.member.length; i++){
                const query = { userID : args.member[i] };
                const addProjectToUser = await Auth.findOneAndUpdate(query, { "$push": { "project": args.title }});
                addProjectToUser.save();

                const notice = new Notice({
                    project: args.title,
                    title: args.title,
                    from: args.designer,
                    to: args.member[i],
                    content: `${args.designer} invited you to new project "${args.title}"`,
                    time: args.started,
                })
                notice.save();
            }

            return newProject.save();
        },
        createNotice: async(parent, args, contextValue, info) => {
            const notice = new Notice({
                project: args.project,
                title: args.title,
                from: args.from,
                to: args.to,
                content: args.content,
                time: args.time,
            })
            notice.save();
        },
        deleteNotice: async(parent, args, contextValue, info) => {
            await Notice.deleteOne({_id: args._id});
        },
        createSchedule: async(parent, args, contextVaule, info) => {
            const newSchedule = new Schedule({
                project: args.project,
                createdTime: args.createdTime,
                startTime: args.startTime,
                endTime: args.endTime,
                proposer: args.proposer,
                content: args.content,
                member: args.member
            })

            for(let i = 0; i < args.member.length; i++){
                const notice = new Notice({
                    project: args.project,
                    title: args.project,
                    from: args.proposer,
                    to: args.member[i],
                    content: `${args.proposer} make new schedule "${args.content}" on ${args.startTime.substr(6,10)} - ${args.endTime.substr(6,10)}`,
                    time: args.createdTime,
                })
                notice.save();
            }

            return newSchedule.save();
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