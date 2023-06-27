import Auth from "./models/auth.model.js";
import Info from "../../ServiceInformation.js";

const resolvers = {
    Query: {
        auths : async () => {
            const users = await Auth.find({});
            return users;
        },
        login : async (parent, args, contextValue, info) => {
            const user = await Auth.findOne({ userID: args.userID, userPW: args.userPW });
            return user;
        }
    },
    Mutation: {
        signIn: (parent, auth) => {
            const newAuth = new Auth({ userID: auth.userID, userPW: auth.userPW, userName: auth.userName, credit: auth.credit, privilege: auth.privilege});
            return newAuth.save();
        }
    }
}


export default resolvers;