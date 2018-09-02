import * as React from "react";

import charSkyline from "@media/charlotteSkyline.jpg";
import charSkyView from "@media/charlotteSkyView.mp4";
import charSkyViewWebm from "@media/charlotteSkyView.webm";

import { Button, Typography } from '@material-ui/core'

interface IProps {
  nothing?: boolean
}

export class Welcome extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
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
        {this.renderWelcome()}
      </header>
    );
  }

  public renderWelcome = () => (
    <section className="welcome">
      <Typography variant="display4" align="center">Welcome to Charlotte</Typography>
      <div className="welcome__button-container">
      <Button
        className="hero-enter-btn"
        variant="contained"
        color="primary"
        size="large"
        href="/home"
      >
        Enter
        </Button>
      </div>
    </section>
  )
}
