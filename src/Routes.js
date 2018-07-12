import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { WithAnalytics } from '_components';
import {
  App,
  BlogRoll,
  BlogPost,
  Homepage,
  LabsPage,
  WorkPage
} from './containers';
import { history } from './stores';

class Routes extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path='/' component={WithAnalytics(App)}>
          <IndexRoute component={Homepage} />
          <Route path='/posts' component={BlogRoll} />
          <Route path='/post/:id' component={BlogPost} />
          <Route path='/page/:id' component={WorkPage} />
          <Route path='/labs' component={LabsPage} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
