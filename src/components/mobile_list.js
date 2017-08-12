import React from 'react';
import {Row, Col} from 'antd';

export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news:''
    };
  }

  componentWillMount() {
    var newsType = this.props.type || 'top'
    var newsCount = this.props.count || 15;
    var myFetchOptions = {
			method: 'GET'
		};
		fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + newsType + '&count=' + newsCount, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
  }

  render() {
    const {news} = this.state;
    const newsList = news.length
    ?
    news.map((newsItem, indx)=>(
      <li key={indx}>
        <section key={indx} className="m_article list-item special_section clearfix">
          <a href='{details/${newsItem.uniquekey}}'>
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </a>
        </section>
      </li>
    ))
    :
    '没有加载到任何数据';

    return(
      <div>
        <Row>
          <Col span={24}>
            {newsList}
          </Col>
        </Row>
      </div>
    );
  }
}
