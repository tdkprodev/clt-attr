import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from '../components/About';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/about" component={About} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;