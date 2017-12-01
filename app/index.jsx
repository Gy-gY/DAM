import './main.css';
import 'video.js/dist/video-js.css';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/landing/Login';
import findPassword from './pages/landing/findPassword';
import register from './pages/landing/register';
import {IntlProvider } from 'react-intl';
import {zh_CN} from './pages/locale/zh';
// import {en_US} from './pages/locale/en';
const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    routeMiddleware,
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider local='zh' messages={zh_CN}>
      <Router>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/findPassword' component={findPassword} />
            <Route path='/register' component={register} />
            <Route path='/' component={Main} />
          </Switch>
        </ConnectedRouter>
      </Router>
    </IntlProvider>
  </Provider>
), document.getElementById('app'));
