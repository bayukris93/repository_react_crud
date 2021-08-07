import { Layout, Menu, Breadcrumb, Row, Col, Input, Image } from 'antd';
import React, { useState } from 'react';
import ButtonSample from '../Component/Button';
import FormPopUp from '../Component/Form';
import CollectionsPage from '../Component/Form';
import TableSample from '../Component/Table';
import Title from 'antd/lib/typography/Title';

const { Header, Content, Footer } = Layout;






const Dashboard = () => {
  return (
    <div>
      <Layout className="layout">
        <Header tyle={{ padding: 10 }}>
          <Title style={{ color: "white", textAlign: 'left' }} level={3}>DATA BARANG</Title>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Row>
            <Col span={12}>
              <Breadcrumb style={{ margin: '16px 0' }}>

              </Breadcrumb>
            </Col>
            <Col span={12}>
              <div style={{ float: 'right', margin: '16px 0' }}>
              
              </div>
            </Col>
          </Row>
          {/* <div className="site-layout-content">SEArch</div> */}
          <TableSample />

       
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>

    </div>
  )
}
export default Dashboard;