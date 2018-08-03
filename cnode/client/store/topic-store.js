import {
  observable,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema, replySchema } from '../until/variable-define';
import { get, post } from '../until/http';

const createTopic = topic => (
   Object.assign( {}, topicSchema, topic)
);

const createReply = reply => (
  Object.assign( {}, replySchema, reply)
);


class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
}

class TopicStore {
  @observable topics;
  @observable details;
  @observable syncing;
  @observable createdReplys = [];
  @observable createdTopics = [];
  @observable count = 1;

  @action createTopic(title, tab, content) {
    return new Promise((resolve, reject) => {
      post('/topics', {
        needAccessToken: true,
      }, {
        title, tab, content,
      })
        .then((data) => {
          if (data.success) {
            const topic = {
              title,
              tab,
              content,
              id: data.topic_id,
              create_at: Date.now(),
            };
            this.createdTopics.push(new Topic(createTopic(topic)));
            resolve(topic)
          } else {
            reject(new Error(data.error_msg || '未知错误'))
          }
        })
        .catch((err) => {
          if (err.response) {
            reject(new Error(err.response.data.error_msg || '未知错误'))
          } else {
            reject(new Error('未知错误'))
          }
        })
    })
  }

  @action doReply(content, id) {
    return new Promise((resolve, reject) => {
      post(`/topic/${id}/replies`, {
        accessToken: true,
      }, { content }).then((resp) => {
        if (resp.success) {
          this.createdReplys.push(createReply({
            id: resp.reply_id,
            content,
            create_at: Date.now(),
          }));
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }

  constructor(syncing = false, topics = [], details = []) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailsMap() {
    return this.details.reduce((result, topic) => {
      result[topic.id] = topic; // eslint-disable-line
      return result;
    }, {})
  }


  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      this.topics = [];
      get('/topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          this.topics = resp.data.map(topic => {   // eslint-disable-line
            return new Topic(createTopic(topic));
          });
          this.syncing = false;
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err);
        this.syncing = false
      })
    })
  }

  @action getTopicDetail(id) {
    console.log('get topic id:', id) // eslint-disable-line
    return new Promise((resolve, reject) => {
      if (this.detailsMap[id]) {
        resolve(this.detailsMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data), true);
            this.details.push(topic);
            resolve(topic)
          } else {
            reject()
          }
        }).catch((err) => {
          reject(err)
        })
      }
    })
  }
}

export default TopicStore
