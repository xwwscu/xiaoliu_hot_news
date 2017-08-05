import React from 'react';
import {Tabs, Icon, Modal, message, Form, Input, Button} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {

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

  login() {
    this.setModalVisible(true);
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined ?
    <Link>
      <Icon type="inbox"/>
    </Link>
    : <Icon type="setting" onClick={this.login.bind(this)}/>;
    return(
      <div id="mobileheader">
        <header>
          <img src="images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
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
        </header>
      </div>
    );
  }
}

const WrappedMobileHeader = Form.create()(MobileHeader);
export default WrappedMobileHeader;
