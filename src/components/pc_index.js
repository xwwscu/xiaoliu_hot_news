import React from 'react';
import WrappedPCHeader from './pc_header';
import PCNewsContainer from './pc_news_container';
import PCFooter from './pc_footer';
import 'styles/pc_index.css';

export default class PCIndex extends React.Component {
  render() {
    return (
      <div>
        <WrappedPCHeader/>
        <PCNewsContainer/>
        <PCFooter/>
      </div>
    );
  }
}
