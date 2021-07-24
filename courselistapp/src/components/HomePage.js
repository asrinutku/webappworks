import React from "react";
import {Link} from "react-router-dom";

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Asrın Utku Yagmur</h1>
      <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo
      </p>
      <Link to="about" className="btn btn-success">
        About
      </Link>
    </div>
  );
}

export default HomePage;