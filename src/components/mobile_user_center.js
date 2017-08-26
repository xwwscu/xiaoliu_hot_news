import React from 'react';
import WrappedMobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Row, Col} from 'antd';
import {Tabs, Card} from 'antd';
const TabPane = Tabs.TabPane;

export class MobileUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      userCollection: '',
      userComments: ''
    };
  }

  componentDidMount() {
		var fetchUCUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId;
		fetch(fetchUCUrl)
		.then(response => response.json())
		.then(json => {
			this.setState({
        userCollection:json
      });
		});
    var fetchCCUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId;
		fetch(fetchCCUrl)
		.then(response=>response.json())
		.then(json=>{
			this.setState({
        userComments:json
      });
		});
    document.title = '个人中心 - React News | React 驱动的新闻平台';
	}

  render() {
    var userCollectionData = this.state.userCollection;
    const userCollectionList = userCollectionData.length ?
    userCollectionData.map((item, index) => (
      <Card key={index} title={item.uniquekey} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Title}</p>
      </Card>
    ))
    : '还没有收藏数据，快去收藏吧~';
    var userCommentsData = this.state.userComments;
    const userCommentsList = userCommentsData.length ?
    userCommentsData.map((item, index) => (
      <Card key={index} title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Comments}</p>
      </Card>
    ))
    : '还没有评论数据，赶紧去评论吧~';

    return (
      <div>
        <WrappedMobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="收藏列表" key="1">
                <Row>
                  <Col span={24}>
                    {userCollectionList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="评论列表" key="2">
                <Row>
                  <Col span={24}>
                    {userCommentsList}
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter/>
      </div>
    );
  }
}
