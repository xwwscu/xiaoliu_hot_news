import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Card} from 'antd';

export default class PCNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news:''
    };
  }

  componentWillMount() {
    var fetchOpt = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
      }
    };
    var reqUrl = "http://v.juhe.cn/toutiao/index?type=" + this.props.type + "&key=7d72de38d8786ed96bec04b0598a728b";
    console.log("type : " + this.props.type + " url --> " + reqUrl);
    fetch(reqUrl, fetchOpt)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
    /*fetch(reqUrl, fetchOpt).then((resp) => {
      console.log('response === ' +JSON.stringify(resp) + " json === " + JSON.stringify(resp.json()));
      return resp.json();
    }).then((jsonObj) => {
      this.setState({news: jsonObj});
    });*/
  }

  render() {
    const {news} = this.state;
    const newsList = news.length
    ?
    news.map((newsItem, indx)=>(
      <li key={indx}>
        <Link to={newsItem.url} target="_blank">{newsItem.title}</Link>
      </li>
    ))
    :
    "没有加载到任何数据";

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
