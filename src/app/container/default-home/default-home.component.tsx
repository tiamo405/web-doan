import { Outlet } from 'react-router-dom'
const DefaultHome = () => {
  return (
  <>
        <div>
            <Outlet/>
        </div>
  </>
  )
}

export default DefaultHome