import logo from "./logo.svg";
import "./App.css";
import {
  Layout,
  Menu,
  Breadcrumb,
  Table,
  Spin,
  Empty,
  Button,
  Badge,
  Tag,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getAllStudents } from "./client";
import { useState, useEffect } from "react";
import StudentDrawerForm from "./StudentDrawerForm";
import Avatar from "antd/lib/avatar/avatar";
import { render } from "@testing-library/react";
import Actions from "./Actions";
import { errorNotification } from "./Notification";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TheAvatar = ({ name }) => {
  const trim = name.trim();
  if (trim.length === 0) {
    return <Avatar icon={UserOutlined} />;
  }

  const split = trim.split(" ");
  if (split.length === 1) {
    return <Avatar>{name.charAt(0)}</Avatar>;
  }

  return (
    <Avatar>
      `${name.charAt(0)}${name.charAt(name.length - 1)}`
    </Avatar>
  );
};

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, student) => {
        return <TheAvatar name={student.name} />;
      },
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, student) => {
        return <Actions student={student} fetchStudents={fetchStudents} />;
      },
    },
  ];

  const fetchStudents = () => {
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      })
      .catch((error) => {
        console.log(error.response);
        error.response.json().then((res) => {
          console.log(res);
          errorNotification(
            "There was an issue",
            `${res.message} [statusCode: ${res.status}]`
          );
        });
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    console.log("Component mounted");
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />;
    }
    if (students.length <= 0) {
      return (
        <>
          <Button
            onClick={() => setShowDrawer(!showDrawer)}
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size="small"
          >
            Add New Student
          </Button>
          <StudentDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}
          />
          <Empty />
        </>
      );
    } else {
      return (
        <div>
          <Table
            dataSource={students}
            columns={columns}
            bordered
            title={() => (
              <div>
                <Tag style={{ marginLeft: "10px" }}>Number of students</Tag>
                <Badge count={students.length} className="site-badge-count-4" />
                <br />
                <br />
                <Button
                  onClick={() => setShowDrawer(!showDrawer)}
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  size="medium"
                >
                  Add New Student
                </Button>
              </div>
            )}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 500 }}
            rowKey={(student) => student.id}
          />
          <StudentDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}
          />
        </div>
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => setCollapsed(c)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {renderStudents()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>By Bernard Guiang</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
