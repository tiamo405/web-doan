import { CameraOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
export const MenuDashboard = () => {
  return [
    {
      key: "/",
      icon: <CameraOutlined />,
      label: "Camera",
    },
    {
      key: "/list-violation",
      icon: <VideoCameraAddOutlined />,
      label: "List violation",
    },
  ];
};
