const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const serverConfig = require('../../build/webpack.config.server');

const path = require('path');
const proxy = require('http-proxy-middleware');

const serverRender = require('./server-render')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      }).catch(reject)
  })
};
const Module = module.constructor;
const NativeModule = require('module');
const vm = require('vm');
const getModuleFormString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports,m.exports,require,m);
  return m

};
const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs;
let serverBundle

serverCompiler.watch({}, (err, stats) => {
  // console.log(stats);
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = getModuleFormString(bundle,'server-entry.js');
  serverBundle =   m.exports
});


module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }));
  app.get('*', function (req, res, next) {
     getTemplate().then(template => {
     return  serverRender(serverBundle,template,req,res)
    }).catch()
  })
};


