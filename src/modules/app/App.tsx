import * as React from 'react'

import { ResponsiveAppBar } from '@components/app-bar';

interface IProps {
  children?: any;
}

export const App = (props: IProps) => (
  <section className="app">
    <ResponsiveAppBar>
      {props.children}
    </ResponsiveAppBar>
  </section>
);