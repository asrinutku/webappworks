import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  const activeStyle = { color: "white" };
  return (
    <nav class="navbar navbar-dark bg-success ">
      <div class=".float-left p-3">
        <NavLink activeStyle={activeStyle} exact to="/" class="m-3">
          Home
        </NavLink>
        {" | "}
        <NavLink activeStyle={activeStyle} to="/About" class="m-3">
          About
        </NavLink>
        {" | "}
        <NavLink activeStyle={activeStyle} to="/courses" class="m-3">
          Courses
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
