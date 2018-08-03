import React from 'react'
import App from "./view/App"
import { StaticRouter } from 'react-router-dom'
import { Provider,useStaticRendering} from 'mobx-react'


import { JssProvider } from 'react-jss'
import { MuiThemeProvider } from 'material-ui/styles'


import { createStoreMap } from './store/store'
useStaticRendering(true)
//
//{appStore:xxx}
export default (store,routerContext,sheetsRegistry,jss,theme,url) => (
      <Provider {...store}>
        <StaticRouter context={routerContext} location={url}>
          <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>
    )
export {
  createStoreMap
}

