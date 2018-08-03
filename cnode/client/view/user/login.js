import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import { Redirect } from 'react-router-dom'
import QueryString from 'query-string'
// import cookie from 'react-cookies'
// import cook_easy from 'react-easy-cookie'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import UserWrapper from './user'
import loginStyles from './styles/login-style'

@inject((stores => (
   {
    appState: stores.appState,
    user: stores.appState.user,
  }
))) @observer


class UserLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      accessToken: '',
      helpText: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInput = this.handleInput.bind(this)
  }

  getFrom(location) {
    const locations = location || this.props.location;
    const query = QueryString.parse(locations.search);
    return query.from || '/user/info'
  }

  handleLogin() {
    if (!this.state.accessToken) {
      return this.setState({
        helpText: '必须填写',
      })
    }
    this.setState({
      helpText: '',
    });
    return this.props.appState.login(this.state.accessToken)
     .catch((error) => {
        console.log(error)
      })
  }

  handleInput(event) {
    this.setState({
      accessToken: event.target.value.trim(),
    })
  }

  render() {
    const { classes } = this.props;
    const { isLogin } = this.props.user;
    const from = this.getFrom();

    if (isLogin) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken"
            placeholder="请输入Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accessToken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            raised="true"
            color="primary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

UserLogin.PropTypes = {
  classes: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(loginStyles)(inject(stores => (
   {
    appState: stores.appState,
    user: stores.appState.user,
  }
))(observer(UserLogin)))
