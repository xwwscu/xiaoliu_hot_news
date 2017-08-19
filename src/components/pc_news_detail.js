import React from 'react';
import {Row, Col, BackTop} from 'antd';
import WrappedPCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_img_block';
import WrappedCommonComment from './common_comment';

export default class PCNewsDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      newsItem: ''
    };
  }

  componentDidMount() {
    var requestUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + this.props.params.uniquekey;
    console.log('detail request url ---> ' + requestUrl);
    fetch(requestUrl).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + ' - React News | React 驱动的新闻平台';
		});
  }

  createMarkUp() {
    var pageContent = this.state.newsItem.pagecontent || '小六出小差了...';
    return {__html: pageContent};
  }

  render() {
    return (
      <div>
        <WrappedPCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkUp()}></div>
            <WrappedCommonComment uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="其他新闻" imageWidth="115px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    );
  }
}
