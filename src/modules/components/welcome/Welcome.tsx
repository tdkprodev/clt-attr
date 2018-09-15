import * as React from "react";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import * as charSkyline from "@media/charlotteSkyline.jpg";
import * as charSkyView from "@media/charlotteSkyView.mp4";
import * as charSkyViewWebm from "@media/charlotteSkyView.webm";

import { Button, Slide, Typography, Fade } from '@material-ui/core';

import { SignIn } from '@components/signin';

/**
 * Render the landing page and provide a button to navigate to the app.
 */
@observer
export class Welcome extends React.Component<any, any> {
  @observable showSignIn: boolean = false;
  private greetingRef = React.createRef<HTMLDivElement>();

  async componentDidMount() {

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 5.3e3);
    });

    promise.then(() => {
      document.getElementById('greeting')!.style.display = 'none';
      this.showSignIn = true;
    });
  }

  public handleSignIn = () => {
    // handlesignin
  }

  public render() {
    return (
      <header className="hero">
        <div className="bg-video">
          <video className="bg-video__content" autoPlay={true} playsInline={true} muted={true} loop={true}>
            <source src={charSkyView} type="video/mp4" />
            <source src={charSkyViewWebm} type="video/webm" />
            <img
              src={charSkyline}
              title="Your browser does not support the <video> tag"
            />
          </video>
        </div>
        <section className="welcome">
          <Typography id="greeting" className="welcome__greeting slide-in-bck-center" variant="display4" align="center">Welcome to Charlotte</Typography>
          <Slide direction="up" in={this.showSignIn} mountOnEnter unmountOnExit timeout={1.1e3}>
            <SignIn handleSignIn={this.handleSignIn} />
          </Slide>
        </section>
      </header>
    );
  }
}
