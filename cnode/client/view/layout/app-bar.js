import React from 'react';
import Proptypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import { AppBar } from 'material-ui';
import ToolBar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home'
import {
  inject,
  observer,
} from 'mobx-react'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

@inject((stores => (
   {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
))) @observer

class MainAppBar extends React.Component {
      static contextTypes = {
        router: Proptypes.object,
      };
      constructor() {
        super();
        this.onHomeIconClick = this.onHomeIconClick.bind(this);
        this.createButtonCLick = this.createButtonCLick.bind(this);
        this.loginButtonClick = this.loginButtonClick.bind(this)
      }
      onHomeIconClick() {
        this.context.router.history.push('/index?tab=all')
      }
      loginButtonClick() {
        if ( this.props.appState.user.isLogin ) {
          this.context.router.history.push('/user/info')
        } else {
          this.context.router.history.push('/user/login')
        }
      }
      createButtonCLick() {
        this.context.router.history.push('/topic/create')
      }
      render() {
       const { classes } = this.props;
       const { user } = this.props.appState;
       return (
         <div className={classes.root}>
           <AppBar position="fixed">
             <ToolBar>
               <IconButton color="inherit" onClick={this.onHomeIconClick}>
                 <HomeIcon />
               </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>JNode</Typography>
                <Button raised="true" color="inherit" onClick={this.createButtonCLick}>新建话题</Button>
                <Button raised="true" color="inherit" onClick={this.loginButtonClick}>
                  { user.isLogin ? user.info.loginName : '登录' }
                </Button>
             </ToolBar>
           </AppBar>
         </div>
            )
      }
}
MainAppBar.wrappedComponent.propTypes = {
  appState: Proptypes.object.isRequired, //eslint-disable-line

};

MainAppBar.propTypes = {
  classes: Proptypes.object.isRequired, //eslint-disable-line
};

export default withStyles(styles)(MainAppBar)

