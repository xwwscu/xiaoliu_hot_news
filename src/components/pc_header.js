import React from 'react';
import {Link} from 'react-router';
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

  componentWillMount() {
    if (localStorage.userId != '') {
      this.setState({
        hasLogined: true,
        userName: localStorage.userName,
        userId: localStorage.userId
      });
    }
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key == 'register') {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }

  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

  handleSubmit(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    var fetchUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action
		+ '&username=' + formData.username + '&password=' + formData.password
		+ '&r_userName=' + formData.r_username + '&r_password='+ formData.r_password
    + '&r_confirmPassword=' + formData.r_confirmpassword;
    console.log('formData : ' + formData  + ' dataStr : ' + JSON.stringify(formData) + ' logInUrl : ' + fetchUrl);
    fetch(fetchUrl).then(response => response.json())
		.then(json => {
      //console.log('response ---> ' + JSON.stringify(json));
      var isSucceed = false;
      if (this.state.action == 'login') {
        if (JSON.stringify(json) != 'null' && json.UserId && json.NickUserName) {
          console.log('update userName : ' + this.state.userName + ' response : ' + JSON.stringify(json));
    			localStorage.userId= json.UserId;
    			localStorage.userName = json.NickUserName;
          message.success('登录成功');
          isSucceed = true;
        }
      } else if (this.state.action == 'register') {
        if (JSON.stringify(json) == 'true') {
          message.success('注册成功');
    			localStorage.userName = formData.r_username;
          isSucceed = true;
        }
      }
      if (isSucceed) {
        this.setState({
          userName: localStorage.userName,
          userId: localStorage.UserId
        });
        this.setState({hasLogined: true});
        this.setModalVisible(false);
      } else {
        message.success('操作失败，请重试');
        this.setModalVisible(false);
      }
		});
  }

  logout(){
		localStorage.userId= '';
		localStorage.userName = '';
		this.setState({hasLogined:false});
	}

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined ?
      <MenuItem key="logout" className="register">
        <Button type="primary" htmlType="button">{this.state.userName}</Button>
        &nbsp;&nbsp;
        <Link target="_blank" to={'/usercenter'}>
          <Button type="dashed" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
      </MenuItem>
      : <MenuItem key="register" className="register">
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
              <Tabs type="card" onChange={this.callback.bind(this)}>
                <TabPane tab="登录" key="1">
                  <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="账户">
                      {getFieldDecorator('username', {
                        rules: [{
                          required: true,
                          message: '请输入用户名'
                        }]
                      })(
                        <Input placeholder="请输入您的用户名" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('password', {
                        rules: [{
                          required: true,
                          message: '请输入密码'
                        }]
                      })(
                        <Input type="password" placeholder="请输入您的密码" />
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  &nbsp;&nbsp;
                  <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('r_username', {
                        rules: [{
                          required: true,
                          message: '请输入用户名'
                        }]
                      })(
                        <Input placeholder="请输入您的用户名" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_password', {
                        rules: [{
                          required: true,
                          message: '请输入密码'
                        }]
                      })(
                        <Input type="password" placeholder="请输入您的密码" />
                      )}
                    </FormItem>
                    <FormItem label="确认密码">
                      {getFieldDecorator('r_confirmpassword', {
                        rules: [{
                          required: true,
                          message: '请再次输入密码'
                        }]
                      })(
                        <Input type="password" placeholder="请再次输入密码" />
                      )}
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
