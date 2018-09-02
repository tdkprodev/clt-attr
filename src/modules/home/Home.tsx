import * as React from 'react'

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { MyAppBar } from '../components/app-bar';
import { Welcome } from '../components/welcome';

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
      <section className="home" id="home">
        {this.showApp ? this.renderHomeBody() : this.renderHero()}
      </section>
    );
  }

  public renderHero = () => {
    return <Welcome renderHomePage={this.renderHomePage} />
  }

  public renderHomeBody = () => {

    return (
      <MyAppBar />
    );
  }
}