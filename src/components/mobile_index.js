import React from 'react';
import WrappedMobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
require('styles/mobile_index.css');

export default class MobileIndex extends React.Component {
  render() {
    return (
      <div>
        <WrappedMobileHeader/>
        <Tabs>
          <TabPane tab="头条" key="1">
            <MobileList count={15} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={15} type="shehui"/>
          </TabPane>
          <TabPane tab="娱乐" key="3">
            <MobileList count={15} type="yule"/>
          </TabPane>
          <TabPane tab="国内" key="4">
            <MobileList count={15} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="5">
            <MobileList count={15} type="guoji"/>
          </TabPane>
        </Tabs>
        <MobileFooter/>
      </div>
    );
  }
}
