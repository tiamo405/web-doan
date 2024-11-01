import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuDashboard } from "../../modules/admin/constance/menu.dashboard";

const { Header, Sider, Content } = Layout;

const DefaultAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handClickMenuDashboard = (data: any) => {
    navigate(data.key);
  };

  return (
    <Layout style={{ height:"120vh" }}>
      <Sider trigger={null} collapsible collapsed={true}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={MenuDashboard()}
          onSelect={handClickMenuDashboard}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        ></Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultAdmin;
