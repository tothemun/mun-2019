import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { WithAnalytics } from '_components';
import {
  App,
  Card,
  Homepage
} from './containers';
import { history } from './stores';

class Routes extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path='/' component={WithAnalytics(App)}>
          <IndexRoute component={Homepage} />
          <Route path='card' component={Card} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
