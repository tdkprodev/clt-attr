import * as React from "react";
import { Link } from "react-router-dom";

/**
 * Render a not-found-page and provide a link to navigate back to the app.
 */
export const NotFoundPage = () => (
  <div className="porfavor">
    <div className="container">
      <h1>
        404!!! - <Link to="/home">go home</Link>
      </h1>
    </div>
  </div>
);

