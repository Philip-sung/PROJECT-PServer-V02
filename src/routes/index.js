import { createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "../screens/LoginScreen";
import App from "../App";

const pServerRouter = createBrowserRouter([
    {
        path: "",
        element: (
            <App />
        )
    },
    {
        path: "login",
        element: (
            <LoginScreen />
        )
    }

])

export { pServerRouter };