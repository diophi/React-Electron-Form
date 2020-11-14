import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import {
  HomeOutlined,  
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Project from './project/project.jsx';
import './app.css';
import Test  from './test/test.jsx';


const { Header, Sider, Content } = Layout;


export default function MainApp () {
    const [collapsed, setCollapsed] = React.useState(false);
    const [currentPath, setCurrentPath] = React.useState(0);

    const menu_list  = ['Acasa','Proiecte','Incarca dxf'];
    const menu_icons = [<HomeOutlined />, <VideoCameraOutlined/> , <UploadOutlined/>];

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleSelect = (value) =>{
        setCurrentPath(value.key);
    }

    return (
    <Layout className="root">
        <Sider  style={{minHeight:'100vh'}} collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} onSelect={handleSelect}>
                {menu_list.map((label,index) => (
                    <Menu.Item key={index}>
                        {menu_icons[index]}
                        <span>{label}</span>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="header" style={{ padding: 0 }}>
                {/*to do top menu*/}
            </Header>
            <Content
                className="content"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >   
                { currentPath == 0 && <Project/>}
                { currentPath == 1 && <div>ladsl</div>}
            </Content>
        </Layout>
    </Layout>
    );
}
