import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory,hashHistory, Router } from 'react-router';
import routes from './routes.js';
import './skins/skin.scss';
// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={hashHistory} routes={routes} />
    </MuiThemeProvider>),
    document.getElementById('root'));