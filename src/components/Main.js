//require('normalize.css/normalize.css');

import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import PCIndex from './pc_index';
import PCNewsDetail from './pc_news_detail';
import MobileIndex from './mobile_index';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}></Route>
            <Route path='/details/:uniquekey' component={PCNewsDetail}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <MobileIndex/>
        </MediaQuery>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
