import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
// import cookie_easy from 'react-easy-cookie'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import UserWrapper from './user'
import infoStyles from './styles/user-info-style'

const TopicItem = (({ topic, onClick }) => (
   (
    <ListItem button onClick={onClick}>
      <Avatar src={topic.author.avatar_url} />
      <ListItemText
        primary={topic.title}
        secondary={`最新回复：${topic.last_reply_at}`}
      />
    </ListItem>
  )
));

TopicItem.PropTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

@inject(stores => (
   {
    user: stores.appState.user,
    appState: stores.appState,
  }
)) @observer
class UserInfo extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  componentWillMount() {
    // cookie_easy.setCookie('userName', '123', 30)
      this.props.appState.getUserDetail();
      this.props.appState.getUserCollection()
  }
  goToTopic(id) {
    this.context.router.history.push(`/detail/${id}`)
  }
  render() {
    const { classes } = this.props;
    const topics = this.props.user.detail.recentTopics;
    const replies = this.props.user.detail.recentReplies;
    const collections = this.props.user.collections.list; //eslint-disable-line
    console.log(collections);
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    topics.length > 0 ?
                      topics.map(topic =>
                        (<TopicItem
                          topic={topic}
                          onClick={() => { this.goToTopic(topic.id) }}
                          key={topic.id} />)) :
                      <Typography align="center">
                        最近没有发布过话题
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    replies.length > 0 ?
                      replies.map(topic =>
                        (<TopicItem
                          topic={topic}
                          onClick={() => { this.goToTopic(topic.id) }}
                          key={topic.id} />)) :
                      <Typography align="center">
                        最近没有新的回复
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {
                    collections.length > 0 ?
                      collections.map(topic =>
                        (<TopicItem
                          topic={topic}
                          onClick={() => { this.goToTopic(topic.id) }}
                          key={topic.id} />))
                       :
                      <Typography align="center">
                        还么有收藏话题哦
                      </Typography>
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.wrappedComponent.PropTypes = {
  appState: PropTypes.object.isRequired,
};

UserInfo.PropTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(infoStyles)(UserInfo)
