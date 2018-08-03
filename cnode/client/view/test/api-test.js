import React from 'react';
import axios from 'axios'
export default class TestApi extends  React.Component{
  getTopics(){
    axios.get('/api/topics')
      .then(resp=>{
          console.log(resp)
       }).catch(err=>{
          console.log(err)
    })

  }
  login(){
    axios.post('/api/user/login',{
      accessToken:"84f71312-2160-4aab-8ef1-7daf1d2e29ab"
    }).then(resp=>{
      console.log(resp)
    })

  }
  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
         console.log(resp)
      }).catch(err => {
         console.log(err)
    })
  }

    render(){
      return (
        <div>
          <button onClick={this.getTopics}>topics</button>
          <button onClick={this.login}>login</button>
          <button onClick={this.markAll}>markAll</button>
        </div>

      )
    }
}
