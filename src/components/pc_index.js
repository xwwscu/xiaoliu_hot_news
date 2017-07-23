import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import 'styles/pc_index.css';

export default class PCIndex extends React.Component {
  render() {
    return (
      <div>
        <PCHeader/>
        <PCFooter/>
      </div>
    );
  }
}
