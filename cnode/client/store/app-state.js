import {
  observable,
  action,
} from 'mobx'
import { post, get } from '../until/http';

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    collections: {
      list: [],
      syncing: false,
    },
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false,
    },
  };

  @action login( accessToken ) {
    return new Promise((resolve, reject) => {
      post('/user/login', {}, { accessToken })
        .then((resp) => {
          if (resp.success) {
            this.user.info = resp.data;
            this.user.isLogin = true;
            resolve(this.user.info)
          } else {
            reject(resp.data.msg)
          }
        })
        .catch((err) => {
          if (err.response) {
            reject(err.response.data.msg);
          } else {
            reject(err.message)
          }
        })
    })
  }


  @action getUserDetail() {
    this.user.detail.syncing = true;
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginName}`)
        .then((resp) => {
          if (resp.success) {
            this.user.detail.recentReplies = resp.data.recent_replies;
            this.user.detail.recentTopics = resp.data.recent_topics;

            resolve()
          } else {
            reject(resp)
          }
          this.user.detail.syncing = false
        }).catch((err) => {
        reject(err.message);
        this.user.detail.syncing = false
      })
    })
  }

  @action getUserCollection() {
    this.user.collections.syncing = true;
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginName}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collections.list = resp.data;
            resolve()
          } else {
            reject(resp)
          }
          this.user.collections.syncing = false
        }).catch((err) => {
        reject(err.message);
        this.user.collections.syncing = false
      })
    })
  }
}
