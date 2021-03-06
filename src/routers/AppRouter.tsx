import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { observable } from 'mobx';

import { About } from '@modules/about';
import { Favorite } from '@modules/favorite';
import { Info } from '@modules/info';
import { LocalBar } from '@modules/local-bar';
import { Place } from '@modules/place';
import { Restaurant } from '@modules/restaurant';
import { Sink } from '@modules/sink';
import { Welcome } from '@components/welcome';

import { App } from '@modules/app';
import { NotFoundPage } from '@modules/not-found-page';

/**
 * Render the welcome/landing page initially.
 * 
 * The welcome/landing page provides a link to enter the app. The app's title and side bar 
 * are static while the main content is rendered based on the url path governed by react-router-dom.
 */
@observer
class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Welcome} />
            <App>
              <Switch>
                <Route path="/sink" component={Sink} />
                <Route path="/favorite" component={Favorite} />
                <Route path="/place" component={Place} />
                <Route path="/restaurant" component={Restaurant} />
                <Route path="/localbar" component={LocalBar} />
                <Route path="/about" component={About} />
                <Route path="/info" component={Info} />
                <Route component={NotFoundPage} />
              </Switch>
            </App>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;