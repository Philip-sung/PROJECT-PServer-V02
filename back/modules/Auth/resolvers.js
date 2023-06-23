import Auth from "./models/auth.model.js";
import Info from "../../ServiceInformation.js";

const resolvers = {
    Query: {
        auths: () => Auth.find({})
    },
    Mutation: {
        signIn: (parent, auth) => {
            const newAuth = new Auth({ userID: auth.userID, userPW: auth.userPW})
            return newAuth.save();
        }
    }
}

const adminUser = new Auth(
    Info.pserverAdminUser
);

adminUser.save().then(()=>{console.log(adminUser)})

export default resolvers;