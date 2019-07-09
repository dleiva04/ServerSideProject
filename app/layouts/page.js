import React, { Component, Fragment } from "react";
import Navbar from "../components/Navbar";
// import "../scss/style.scss";

const Page = ({ children }) => (
  <Fragment>
    <Navbar/>
    <main>{children}</main>
  </Fragment>
);

export default Page;
