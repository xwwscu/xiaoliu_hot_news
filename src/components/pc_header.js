import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon} from 'antd';
const MenuItem = Menu.Item;
//const SubMenu = Menu.SubMenu;
//const MenuIconGroup = Menu.ItemGroup;

export default class PCHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      current:'top'
    };
  }

  render() {
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
            <Menu mode="horizontal" selectedKeys={[this.state.current]}>
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
            </Menu>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}
