import React from "react";

import navicon from './navicon.png';

import "./navbar.css";
const Navbar = () => {
  return (
    <div className="main-block m-0 p-0 ">
      <nav className=" navbar d-flex shadow-sm w-100">
     <img className="Navicon" src="https://img.icons8.com/?size=48&id=qA3w9Yp2vY7r&format=png" alt="" />
      <header className="fw-bold heading">Weather App</header>

    </nav>
    </div>
  );
};

export default Navbar;
