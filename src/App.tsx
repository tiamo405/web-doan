
import DefaultHome from './app/container/default-home/default-home.component'
import DefaultLayout from './app/container/default-layout/default-layout.component'
import { useRoutes } from 'react-router-dom'
import { clientRouter } from './app/modules/client/client.router'

function App() {
  let element: any = useRoutes([
    {
      path:"/",
      element: <DefaultLayout/>,
      children:[
        {
          path: "",
          element: <DefaultHome/>,
          children: clientRouter
        }
      ]
    }
  ])

  return element
}

export default App
