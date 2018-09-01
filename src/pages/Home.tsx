import * as React from 'react'

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Hero from '../components/Hero';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

interface IProps {
  noProps?: boolean;
}

@observer
class Home extends React.Component<IProps> {
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
    return <Hero renderHomePage={this.renderHomePage}/>
  }

  public renderHomeBody = () => {
    
    return (
      <ResponsiveAppBar />
    );
  }
}
 
export default Home;