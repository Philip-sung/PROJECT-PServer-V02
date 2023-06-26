import Auth from "./models/auth.model.js";
import Info from "../../ServiceInformation.js";

const resolvers = {
    Query: {
        auths : async () => {
            const users = await Auth.find({})
            return users;
        }
    },
    Mutation: {
        signIn: (parent, auth) => {
            const newAuth = new Auth({ userID: auth.userID, userPW: auth.userPW})
            return newAuth.save();
        }
    }
}


export default resolvers;