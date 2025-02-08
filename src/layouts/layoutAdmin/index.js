import { Outlet, useNavigate } from "react-router-dom";
import {
    FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PicCenterOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import "./style.scss";
import Footer from "./footer";
import { getCookie, setCookie } from "../../helper/cookie";
const { Header, Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const key = getCookie("key");
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="title">{collapsed ? "ITA" : "IT Admin"}</div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[ key ? key : "1"]}
            items={[
              {
                key: "1",
                icon: <MessageOutlined />,
                label: "Tổng quan",
                onClick: () => {navigate("/admin"); setCookie("key","1",1)}
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "Thông tin công ty",
                onClick: () => {navigate("/info-company"); setCookie("key","2",1)}
              },
              {
                key: "3",
                icon: <PicCenterOutlined />,
                label: "Quản lý việc làm",
                onClick: () => {navigate("/job-manage"); setCookie("key","3",1)}
              },
              {
                key: "4",
                icon: <FormOutlined />,
                label: "Quản lý CV",
                onClick: () => {navigate("/cv-manage"); setCookie("key","4",1)}
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className="header">
              <div className="header___left">
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
              </div>
              <div className="header___right">
                <Button className="header__button" href="/">
                  Trang chủ
                </Button>
                <Button className="header__button" href="/logout">
                  Đăng xuất
                </Button>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
        <div className="layout__footer">
            <Footer/>
        </div>
        
      </Layout>
    </>
  );
}

export default LayoutAdmin;
