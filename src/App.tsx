import DefaultHome from "./app/container/default-home/default-home.component";
import DefaultLayout from "./app/container/default-layout/default-layout.component";
import { useRoutes } from "react-router-dom";
import { adminRouter } from "./app/modules/admin/admin.router";
import DefaultClient from "./app/container/default-client/default-client.component";
import { clientRouter } from "./app/modules/client/client.router";

function App() {
  let element: any = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "",
          element: <DefaultHome />,
          children: adminRouter,
        },
        {
          path: "/login",
          element: <DefaultClient />,
          children: clientRouter,
        },
      ],
    },
  ]);

  return element;
}

export default App;
