import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Welcome } from '@components/welcome';
import { Home } from '@modules/home';
import { NotFoundPage } from '@modules/not-found-page';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact={true} path="/" component={Welcome} />
        <Route exact={true} path="/home" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;