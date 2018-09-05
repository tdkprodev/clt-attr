import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Welcome } from '@components/welcome';
import { About } from '@components/about';
import { Restaurant } from '@components/restaurant';
import { Place } from '@components/place';
import { Info } from '@components/info';
import { LocalBar } from '@components/local-bar';
import { Favorite } from '@components/favorite';

import { App } from '@modules/app';
import { NotFoundPage } from '@modules/not-found-page';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route exact={true} path="/" component={Welcome} />
      <App>
        <Switch>
          <Route exact path="/favorite" component={Favorite} />
          <Route exact path="/place" component={Place} />
          <Route exact path="/restaurant" component={Restaurant} />
          <Route exact path="/localbar" component={LocalBar} />
          <Route exact path="/about" component={About} />
          <Route exact path="/info" component={Info} />
          <Route component={NotFoundPage} />
        </Switch>
      </App>
    </div>
  </BrowserRouter>
);

export default AppRouter;