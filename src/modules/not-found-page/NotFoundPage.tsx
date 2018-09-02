import * as React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="porfavor">
    <div className="container">
      <h1>
        404!!! - <Link to="/">go home</Link>
      </h1>
    </div>
  </div>
);

