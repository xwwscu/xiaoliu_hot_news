import React from 'react';
import {Row, Col} from 'antd';
import {Form, Card, Button, Input} from 'antd';
const FormItem = Form.Item;

class CommonComment extends React.Component {
  constructor() {
		super();
		this.state = {
			comments: ''
		};
	}

  componentDidMount() {
    var requestUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey;
    console.log('request url : ' + requestUrl);
    fetch(requestUrl).then(response => response.json()).then(json => {
      this.setState({comments: json});
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var formdata = this.props.form.getFieldsValue();
    var fetchUrl = 'http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + formdata.remark;
		fetch(fetchUrl).then(response => response.json()).then(json => {
      console.log('submit result : ' + JSON.stringify(json));
      this.componentDidMount();
		});
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentsList = comments.length ? comments.map((comment, index) => (
        <Card key={index} title={comment.UserName} extra={<a>发表于 {comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>
      )) : '没有加载到评论';

    return (
      <div>
        <Row>
          <Col span={24}>
            {commentsList}
            &nbsp;&nbsp;
            <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                {getFieldDecorator('remark', {
                  rules: [{
                    required: true,
                    message: '请填写评论内容'
                  }],
                  initialValue:'我顶啊顶啊顶'
                })(
                  <Input type="textarea" placeholder="天空没有留下鸟儿的翅膀，但我已飞过..."/>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedCommonComment = Form.create()(CommonComment);
export default WrappedCommonComment;
