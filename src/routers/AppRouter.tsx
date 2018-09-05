import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
// import { observable } from 'mobx';

import { Welcome } from '@components/welcome';
import { About } from '@components/about';
import { Restaurant } from '@components/restaurant';
import { Place } from '@components/place';
import { Info } from '@components/info';
import { LocalBar } from '@components/local-bar';
import { Favorite } from '@components/favorite';

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
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <App>
              <Switch>
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