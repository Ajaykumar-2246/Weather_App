import React from "react";

import navicon from './navicon.png';

import "./navbar.css";
const Navbar = () => {
  return (
    <div className="main-block m-0 p-0 ">
      <nav className=" navbar d-flex shadow-sm w-100">
      <i className='fas fa-cloud-sun  Navicon' ></i>
      <header className="fw-bold heading">Weather App</header>

    </nav>
    </div>
  );
};

export default Navbar;
