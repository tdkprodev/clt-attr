import * as React from 'react'

import { ResponsiveAppBar } from '@modules/app-bar';

interface IProps {
  children?: any;
}

/**
 * @param props gets passed the children component to be rendered in the main section of ResponsiveAppBar based on the url path.
 */
export const App = (props: IProps) => (
  <section className="app">
    <ResponsiveAppBar>
      {props.children}
    </ResponsiveAppBar>
  </section>
);  