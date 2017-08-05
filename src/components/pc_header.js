import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon} from 'antd';
import {Tabs, Modal, message, Form, Input, Button} from 'antd';
const MenuItem = Menu.Item;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
//const SubMenu = Menu.SubMenu;
//const MenuIconGroup = Menu.ItemGroup;

class PCHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userName: '',
      userId: -1
    };
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key='register') {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({userName: 'xww', userId: 'id_123'});
    message.success('注册成功');
    this.setModalVisible(false);
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined ?
      <MenuItem key="logout" class="register">
        <Button type="primary" htmlType="button">{this.state.userName}</Button>
        &nbsp;&nbsp;
        <Link target="_blank">
          <Button type="dashed" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button">退出</Button>
      </MenuItem>
      : <MenuItem key="register" class="register">
          <Icon type="appstore"/> 注册/登录
      </MenuItem>;
    return(
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="images/logo.png" alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="community">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="entertainment">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="internal">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="external">
                <Icon type="appstore"/>国际
              </MenuItem>
              {userShow}
            </Menu>
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
              <Tabs type="card">
                <TabPane tab="注册" key="2">
                  <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="用户名">
                      <Input placeholder="请输入用户名" {...getFieldDecorator('r_userName')}/>
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="请输入密码" {...getFieldDecorator('r_password')}/>
                    </FormItem>
                    <FormItem label="确认密码">
                      <Input type="password" placeholder="请再次输入密码" {...getFieldDecorator('r_confirmpassword')}/>
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}

const WrappedPCHeader = Form.create()(PCHeader);
export default WrappedPCHeader;
