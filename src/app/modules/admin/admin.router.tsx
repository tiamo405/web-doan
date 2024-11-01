import { RouteObject } from "react-router-dom";
import Home from "./home/home.component";
import { ViolationList } from "./violation/violation";


export const clientRouter: RouteObject[]=[
    {
        path:'',
        element: <Home/>
    },
    {
        path:'/list-violation',
        element: <ViolationList/>
    }
]