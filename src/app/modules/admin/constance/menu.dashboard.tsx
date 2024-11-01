import { CameraOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
export const MenuDashboard = () => {
  return [
    {
      key: "/",
      icon: <CameraOutlined />,
      label: "CAMERA MANAGEMENT",
    },
    {
        key: "/list-violation",
        icon: <VideoCameraAddOutlined />,
        label: "LIST VIOLATION",
      },
  ];
};
