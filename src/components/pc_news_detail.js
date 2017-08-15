import React from 'react';
import {Row, Col} from 'antd';

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
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkUp()}></div>
          </Col>
          <Col span={6}></Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}
