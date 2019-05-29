import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

const { Sider } = Layout;
class Home extends Component {
  state = {
    collapsed: true
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Sider 
        style={{
          overflow: 'auto',
          height: '100vh',
          left: 0,
        }}
        collapsible 
        collapsed={this.state.collapsed} 
        onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="api" />
            <span>Entornos</span>
            <Link to="/entornos" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="fork" />
            <span>Dispositivos</span>
            <Link to="/devices" />
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
};

export default Home;
