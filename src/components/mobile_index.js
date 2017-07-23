import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
require('styles/mobile_index.css');

export default class MobileIndex extends React.Component {
  render() {
    return (
      <div>
        <MobileHeader/>
        <MobileFooter/>
      </div>
    );
  }
}
