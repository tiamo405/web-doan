import { RouteObject } from "react-router-dom";
import Home from "./home/home.component";


export const clientRouter: RouteObject[]=[
    {
        path:'',
        element: <Home/>
    }
]