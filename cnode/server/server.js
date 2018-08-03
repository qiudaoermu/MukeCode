const express = require('express');

const ReactSSR = require('react-dom/server');
const fs = require('fs');

const bodyParse = require('body-parser');
const session = require('express-session');
const serverRender = require('./until/server-render')
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extend:false}));

app.use(session({
  maxAge:10 * 60 * 1000,
  name:'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}));
app.use('/api/user',require('./until/handle-login'));
app.use('/api',require('./until/proxy'))
app.use('/public',express.static(path.join(__dirname,'../dist')));
if(!isDev){
    const serverEntry = require('../dist/server-entry')
    const template = fs.readFileSync(path.join(__dirname,'../dist/server.ejs'),'utf8');
    app.get('*',function (req,res,next) {
      serverRender(serverEntry,template,req,res).catch(next)
    });
}else{
    const devStatic = require('./until/dev-static');
    devStatic(app)
}
app.use(function (error,req,res,next) {
    console.log(error)
      res.status(500).send(error)
});
app.listen(3333,function () {
    console.log('server is listening 3333')
});
