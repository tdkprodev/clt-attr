import * as React from "react";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import * as charSkyline from "@media/charlotteSkyline.jpg";
import * as charSkyView from "@media/charlotteSkyView.mp4";
import * as charSkyViewWebm from "@media/charlotteSkyView.webm";

import { Button, Slide, Typography, Fade } from '@material-ui/core';

import { SignIn } from '@modules/auth/signin';
import { SignUp } from '@modules/auth/signup';

/**
 * Render the landing page and provide a button to navigate to the app.
 */
@observer
export class Welcome extends React.Component<any, any> {
  @observable private showModal: boolean = false;
  @observable private showSignIn: boolean = true;
  private signInDelay: any;

  componentDidMount() {
    this.signInDelay = setTimeout(() => this.showModal = true, 3e3);
  }

  /** Clear the setTimeout delay and show the signin form */
  public handleClickHero = () => {
    clearTimeout(this.signInDelay);
    this.showModal = true;
  }

  public handleToggleModal = () => {
    this.showSignIn = !this.showSignIn;
  }

  public render() {
    return (
      <header className="hero" onClick={this.handleClickHero}>
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
          {/* <Typography id="greeting" className="welcome__greeting slide-in-bck-center" variant="display4" align="center">Welcome to Charlotte</Typography> */}
          <Slide direction="up" in={this.showModal} mountOnEnter unmountOnExit timeout={.7e3}>

            {this.showSignIn ? <SignIn toggleModal={this.handleToggleModal} /> : <SignUp toggleModal={this.handleToggleModal} />}
          </Slide>
        </section>
      </header>
    );
  }
}
