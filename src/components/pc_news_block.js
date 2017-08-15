import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';

export default class PCNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news:''
    };
  }

  componentWillMount() {
    //var reqUrl = "http://v.juhe.cn/toutiao/index?type=" + this.props.type + "&key=7d72de38d8786ed96bec04b0598a728b";
    var newsType = this.props.type || 'top'
    var newsCount = this.props.count || 15;
    var reqUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + newsType + '&count=' + newsCount;
    var requestOpt = {
      url: reqUrl,
      method: 'GET'
    };
    console.log('type : ' + this.props.type + ' url --> ' + reqUrl);
    // fetch(requestOpt)
    // .then(response => response.json())
    // .then(json => this.setState({news: json}));
    // fetch(requestOpt).then((resp) => {
    //   console.log('response === ' + resp + " Stringify : " + JSON.stringify(resp));
    //   return resp.json();
    // }).then((jsonObj) => {
    //   this.setState({news: jsonObj});
    // });
		fetch(reqUrl).then(response => response.json()).then(json => this.setState({news: json}));
  }

  render() {
    const {news} = this.state;
    const newsList = news.length
    ?
    news.map((newsItem, indx)=>(
      <li key={indx}>
        <Link to={`details/${newsItem.uniquekey}`} target="_blank">
          {newsItem.title}
        </Link>
      </li>
    ))
    :
    '没有加载到任何数据';

    return(
      <div className="topNewsList">
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  }
}
