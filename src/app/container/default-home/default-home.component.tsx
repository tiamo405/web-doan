import { Layout, Menu, Avatar, theme, Button, Row, Col, Popover } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuDashboard } from "../../modules/admin/constance/menu.dashboard";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Header, Sider, Content, Footer } = Layout;
const DefaultAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handClickMenuDashboard = (data: any) => {
    navigate(data.key);
  };
  const handleLogout = (key:any) => {
    navigate(key)
  }
  return (
    <Layout style={{ height: "147vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <img
            src="src\assets\logo2.png"
            alt="Logo"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
        <hr
          style={{ border: "1px solid #fff", width: "80%", margin: "0 auto" }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={MenuDashboard()}
          onSelect={handClickMenuDashboard}
          style={{ marginTop: "20px" }}
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
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Row
            align="middle"
            style={{ flex: 1, justifyContent: "flex-end", marginRight: "25px" }}
          >
            <Col>
              <Popover
                content={
                  <div>
                    <Button
                      className="pointer"
                      style={{ marginTop: "10px" }}
                      onClick={() => handleLogout("/login")}
                    >
                      Logout
                    </Button>
                  </div>
                }
                title={
                  <div>
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      style={{ marginRight: 10 }}
                    />
                    {/* {dataUser?.email} */}namtp@admin.com
                  </div>
                }
              >
                <Avatar size={35} icon={<UserOutlined />} className="pointer" />
              </Popover>
            </Col>
            <Col style={{ marginLeft: "10px" }}>Trần Phương Nam</Col>
          </Row>
        </Header>

        <Content>
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: colorBgContainer,
          }}
        >
          <b>©2024 by Namtp</b>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultAdmin;
