// Typically use reuseable 'layout' components with more complex SPAs in
// in conjunction with react-router, react-document-title, react-container-query

import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import GlobalHeader from '../components/GlobalHeader';

const { Header, Content, Footer } = Layout;

class GlobalLayout extends PureComponent {
  render() {
    const {
      children,
    } = this.props;
    return (
      <Layout style={{ height: '100%', background: '#FFF' }}>
        <Header style={{ background: '#FFF' }}>
          <GlobalHeader />
        </Header>
        <Content style={{ padding: '0 16px' }}>
          {children}
        </Content>
      </Layout>
    );
  }
}

export default GlobalLayout;
