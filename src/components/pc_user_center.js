import React from 'react';
import WrappedPCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Row, Col} from 'antd';
import {Tabs, Card, Icon, Modal, Upload} from 'antd';
const TabPane = Tabs.TabPane;

export class PCUserCenter extends React.Component {

  constructor() {
    super();
    this.state = {
      userCollection: '',
      userComments: '',
      previewImage: '',
      previewVisible: false
    }
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
    const props = {
      action: 'http://newsapi.gugujiankong.com/Handler.ashx',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        state: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
      }],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible: true
        });
      }
    };

    var userCollectionData = this.state.userCollection;
    const userCollectionList = userCollectionData.length ?
    userCollectionData.map((item, index) => (
      <Card key={index} title={item.uniquekey} extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Title}</p>
      </Card>
    ))
    : '还没有收藏数据，快去收藏吧~';
    var userCommentsData = this.state.userComments;
    const userCommentsList = userCommentsData.length ?
    userCommentsData.map((item, index) => (
      <Card key={index} title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`} extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>}>
        <p>{item.Comments}</p>
      </Card>
    ))
    : '还没有评论数据，赶紧去评论吧~';

    return (
      <div>
        <WrappedPCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="收藏列表" key="1">
                <div className="comment">
                  <Row>
                    <Col span={24}>
                      {userCollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="评论列表" key="2">
              <div className="comment">
                <Row>
                  <Col span={24}>
                    {userCommentsList}
                  </Col>
                </Row>
              </div>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div className="clearfix">
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">上传头像</div>
                  </Upload>
                  <Modal visible ={this.state.previewVisible} footer={null} >
										<img alt="预览" src={this.state.previewImage}/>
									</Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    );
  }
}
