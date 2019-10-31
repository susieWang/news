"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route,browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/entry/main.less';

import List from "./pages/List";
import Detail from "./pages/Detail";
import Mine from "./pages/Mine";
import Radio from "./pages/Radio";

const store = configureStore();
var appName = window.appName;

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={appName+''} component={List} />
            <Route path={appName+'index'} component={List} />
            <Route path={appName+'detail'} component={Detail} />
            <Route path={appName+"mine"} component={Mine}/>
            <Route path={appName+"radio"} component={Radio}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);