import { RouteObject } from "react-router-dom";
import {LoginPage} from "./login/login";


export const clientRouter: RouteObject[]=[
    {
        path:"",
        element: <LoginPage/>
    },
]