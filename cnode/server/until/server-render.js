const ReactDomServer = require('react-dom/server');
const ejs = require('ejs');
const serilize = require('serialize-javascript');
const asyncBootStrap = require('react-async-bootstrapper');
const Helmet = require('react-helmet').default;

const SheetsRegistry = require('react-jss').SheetsRegistry;
const create = require('jss').create;
const preset = require('jss-preset-default').default;
const createMuiTheme = require('material-ui/styles').createMuiTheme;
const createGenerateClassName = require('material-ui/styles/createGenerateClassName').default;
const colors = require('material-ui/colors');


const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName]
    return result
  }, {})
};
module.exports= (bundle,template,req,res) => {
  return new Promise((resolve, reject) => {

    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    const routerContext = {};
    const stores =createStoreMap();
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette:{
        primary:colors.pink,
        accent:colors.lightBlue,
        type:'light'
      }
    });




    const app = createApp(stores, routerContext,sheetsRegistry,jss,theme,req.url);


    asyncBootStrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return
      }
    console.log(initialState)
      const helmet = Helmet.rewind();
      const state = getStoreState(stores);
      console.log(stores.appState.count);
      const content = ReactDomServer.renderToString(app);
      const html = ejs.render(template, {
        appString: content,
        initialState: serilize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.title.toString(),
        link: helmet.link.toString(),
        materialCss:sheetsRegistry.toString()
      });
      res.send(html);
      resolve()
    }).catch(reject)
  })
};
