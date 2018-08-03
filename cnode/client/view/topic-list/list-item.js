import React from 'react'
import ListItem from 'material-ui/List/ListItem'
import ListItemAvatar from 'material-ui/List/ListItemAvatar'
import ListItemText from 'material-ui/List/ListItemText'
import Avatar from 'material-ui/Avatar'
import cx from 'classnames'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import { topicPrimaryStyle, secondaryStyles } from './style'
import { tabs } from '../../until/variable-define';


const Primary = ({ classes, topic }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top,
  });
  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
};

const Secondary = ({ classes, topic }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
         <span className={classes.accentColor}>{topic.reply_count}</span>
         <span>/</span>
         <span>{topic.visit_count}</span>
    </span>
    <span>
        创建时间:{dateFormat(topic.create_at, 'yy年mm年dd日')}
    </span>
  </span>
);
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);
const StyledSecondary = withStyles(secondaryStyles)(Secondary);

Primary.PropTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

Secondary.PropTypes = {
  topic: PropTypes.object.isRequired,
};


const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecondary topic={topic} />}
    />
  </ListItem>
);

TopicListItem.PropTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};
export default TopicListItem

