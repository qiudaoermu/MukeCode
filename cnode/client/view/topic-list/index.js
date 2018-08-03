import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import List from 'material-ui/List'
import queryString from 'query-string'
import Tabs, { Tab } from 'material-ui/Tabs'
import { CircularProgress } from 'material-ui/Progress'

import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../until/variable-define'

@inject(stores => (
   {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
)) @observer

export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this)
  }
  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }
  getTab(search) {
    const searchs = search || this.props.location.search;
    const query = queryString.parse(searchs);
    return query.tab || 'all'
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true)
      })
    })
  }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }

  changeTab(event, value) {
    this.context.router.history.push({
      pathname: 'index',
      search: `?tab=${value}`,
    })
  }

  listItemClick(topic) {
    this.props.topicStore.count = 2
    this.context.router.history.push(`/detail/${topic.id}`)
  }

  render() {
    const {
      topicStore,
    } = this.props;

    const topicList = topicStore.topics;
    const syncingTopics = topicStore.syncing;

    const tab = this.getTab();
    const tabValue = tab || 'all';
    return (
      <Container>
        <Helmet>
          <title>This is topic List</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tabValue} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(t => <Tab key={t} label={tabs[t]} value={t} />)
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => (<TopicListItem
              key={topic.id}
              onClick={() => this.listItemClick(topic)}
              topic={topic} />) )
          }
        </List>
        {
          syncingTopics ?
            (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}

              >
                <CircularProgress color="secondary" size={100}></CircularProgress>
              </div>)
            : null
        }
      </Container>
    )
  }
}


TopicList.wrappedComponent.PropTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
};

TopicList.PropTypes = {
  location: PropTypes.object.isRequired,
};
