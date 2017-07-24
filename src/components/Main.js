//require('normalize.css/normalize.css');

import React from 'react';
import PCIndex from './pc_index';
import MobileIndex from './mobile_index';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <PCIndex/>
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
