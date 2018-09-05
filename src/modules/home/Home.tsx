import * as React from 'react'

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { ResponsiveAppBar } from '@components/app-bar';

// import { Typography } from '@material-ui/core';

interface IProps {
  noProps?: boolean;
}

@observer
export class Home extends React.Component<IProps> {
  @observable public showApp: boolean = false;

  public renderHomePage = () => {
    this.showApp = true;
  }

  public render() {

    return (
      <section className="home">
        <ResponsiveAppBar>
          {this.props.children}
        </ResponsiveAppBar>
      </section>
    );
  }
}