import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconReply from 'material-ui-icons/Reply'
import { CircularProgress } from 'material-ui/Progress'
import SimpleMde from 'react-simplemde-editor'
import dateForm from 'dateformat'

import Container from '../layout/container'
import { TopicStore } from '../../store/topic-store'
import { topicDetailStyle } from './styles'

import Reply from './reply'


@inject(stores => ({
  topicStore: stores.topicStore,
  appState: stores.appState,
  user: stores.appState.user,
})) @observer
class TopicDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      newReply: '',
      showEditor: false,  //eslint-disable-line
    };
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.doReply = this.doReply.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('component did mount id:', id); // eslint-disable-line
    this.props.topicStore.getTopicDetail(id).catch((err) => {
      console.log('detail did mount error:', err)  //eslint-disable-line
    });
    setTimeout(() => {
      this.setState({
        showEditor: true,  //eslint-disable-line
      })
    }, 1000)
  }

  getTopic() {
    const { id } = this.props.match.params;
    return this.props.topicStore.detailsMap[id]
  }
  asyncBootstrap() {
    const { id } = this.props.match.params;
    return this.props.topicStore.getTopicDetail(id).then(() => {  //eslint-disable-line
      return true
    }).catch((err) => {
      throw err
    })
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    })
  }

  goToLogin() {
    this.context.router.history.push('/user/login')
  }

  handleReply() {
    // do reply here
    this.getTopic().doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        });
        this.props.appState.notify({ message: '评论成功' })
      })
      .catch(() => {
        this.props.appState.notify({ message: '评论失败' })
      })
  }
  gotoTopicId() {
    return this.props.match.params.id
  }
  doReply() {
        const id = this.gotoTopicId();
        const topic = this.props.topicStore.detailsMap[id];
        this.props.topicStore.doReply(this.state.newReply, topic.id).then(() => {
          this.setState({
            newReply: '',
          })
        })
  }
  render() {
    const topic = this.getTopic();
    const { classes } = this.props;
    const { user } = this.props.appState;
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
          </section>
        </Container>
      )
    }

    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {
          this.props.topicStore.createdReplys && this.props.topicStore.createdReplys.length > 0 ?
            (
              <Paper elevation={4} className={classes.replies}>
                <header className={classes.replyHeader}>
                  <span>我的鸡腿</span>
                  <span>{`${this.props.topicStore.createdReplys.length}条`}</span>
                </header>
                {
                  this.props.topicStore.createdReplys.map((reply) => (  //eslint-disable-line
                    <Reply reply={Object.assign({}, reply, {
                      author: {
                        avatar_url: user.info.avatar_url,
                        loginname: user.info.loginname,
                      },
                    })}>
                    </Reply>
                    ),
                  )
                }
              </Paper>
            ) : ''
        }
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateForm(topic.last_reply_at, 'yy-dd-mm')}`}</span>
          </header>
          { user.isLogin &&
              <section className={classes.replyEditor}>
                <SimpleMde
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  option={{
                     toolbar: false,
                     autoFocus: false,
                     spellChecker: false,
                     placeholder: '添加您的鸡腿',
                  }}
                />
                <Button
                  fab="true"
                  color="primary"
                  onClick={this.doReply}
                  className={classes.replyButton}>
                  <IconReply color="primary">

                  </IconReply>
                </Button>
              </section>
            }
          {
            !user.isLogin &&
              <section className={classes.notLoginButton}>
                <Button raised="true" color="secondary" onClick={this.goToLogin}>
                  登录并进行回复
                </Button>
              </section>
          }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.PropTypes = {
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
};

TopicDetail.PropTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(topicDetailStyle)(TopicDetail)
