import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import '../App.css';
import SideMenu from './Sider'
import Home from './Home'
import EntornoList from './EntornoList';
import DeviceList from './DeviceList';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <SideMenu />
        <Layout >
          <Content>
            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/entornos" component={EntornoList} />
                <Route path="/devices" component={DeviceList} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }} >Laboratorios Humedos @2018 Upayacu</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
