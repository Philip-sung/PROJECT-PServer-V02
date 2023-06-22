import { createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "../screens/LoginScreen";
import { PostScreen } from "../screens/PostScreen"
import App from "../App";

const pServerRouter = createBrowserRouter([
    {
        path: "",
        element: (
            <App />
        )
    },
    {
        path: "/",
        element: (
            <App />
        )
    },
    {
        path: "login",
        element: (
            <LoginScreen />
        )
    },
    {
        path: "post",
        element: (
            <PostScreen />
        )
    }

])

export { pServerRouter };