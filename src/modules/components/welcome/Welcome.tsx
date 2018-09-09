import * as React from "react";
import { Link } from 'react-router-dom';

import * as charSkyline from "@media/charlotteSkyline.jpg";
import * as charSkyView from "@media/charlotteSkyView.mp4";
import * as charSkyViewWebm from "@media/charlotteSkyView.webm";

import { Button, Typography } from '@material-ui/core';

/**
 * Render the landing page and provide a button to navigate to the app.
 */
export class Welcome extends React.Component<any, any> {
  constructor(props: any) {
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
        <Link to="/favorite">
          <Button
            className="hero-enter-btn"
            variant="contained"
            color="primary"
            size="large"
          >
            Enter
        </Button>
        </Link>
      </div>
    </section>
  )
}
