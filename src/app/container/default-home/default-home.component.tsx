import { Layout, Menu, Avatar, theme, Button, Row, Col, Popover } from "antd";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const tokenLocal = localStorage.getItem("isLoginToken");

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handClickMenuDashboard = (data: any) => {
    navigate(data.key);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.setItem("isLoginToken", "false");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("full_name");
    localStorage.removeItem("role_id");
    window.location.href = "/login";
  };

  return (
    <>
      {tokenLocal == "true" ? (
        <>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} >
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
                style={{
                  border: "1px solid #fff",
                  width: "80%",
                  margin: "0 auto",
                }}
              />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[currentPath]}
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
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <Row
                  align="middle"
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginRight: "25px",
                  }}
                >
                  <Col>
                    <Popover
                      content={
                        <div>
                          <Button
                            className="pointer"
                            style={{ marginTop: "10px" }}
                            onClick={() => handleLogout()}
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
                          {localStorage.getItem("email")}
                        </div>
                      }
                    >
                      <Avatar
                        size={35}
                        icon={<UserOutlined />}
                        className="pointer"
                      />
                    </Popover>
                  </Col>
                  <Col style={{ marginLeft: "10px" }}>
                    {" "}
                    <h3>{localStorage.getItem("full_name")}</h3>
                  </Col>
                </Row>
              </Header>

              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <Outlet />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Tiamo Company ©{new Date().getFullYear()} Created by{" "}
                <a href="https://hiepph.vercel.app">Namtp</a>
              </Footer>
            </Layout>
          </Layout>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default DefaultAdmin;
