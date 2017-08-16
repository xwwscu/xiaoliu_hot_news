import React from 'react';
import {Row, Col, BackTop} from 'antd';
import WrappedMobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileNewsDetail extends React.Component {

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
      <div id="mobileDetailsContainer">
        <div className="ucmobileList">
          <WrappedMobileHeader/>
          <Row>
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkUp()}></div>
            </Col>
          </Row>
          <MobileFooter/>
          <BackTop/>
        </div>
      </div>
    );
  }
}
