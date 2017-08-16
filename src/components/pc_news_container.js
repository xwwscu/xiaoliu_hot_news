import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_img_block';

export default class PCNewsContainer extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src="../images/carousel_7.jpg" className="containerImg"></img></div>
                  <div><img src="../images/carousel_3.jpg"className="containerImg"></img></div>
                  <div><img src="../images/carousel_6.jpg"className="containerImg"></img></div>
                  <div><img src="../images/carousel_4.jpg"className="containerImg"></img></div>
                  <div><img src="../images/carousel_5.jpg"className="containerImg"></img></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="新闻" key="1">
                <PCNewsBlock type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际" key="2">
								<PCNewsBlock type="guoji" width="100%" bordered="false"/>
							</TabPane>
            </Tabs>
            <div>
							<PCNewsImageBlock count={12} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={12} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
						</div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}
