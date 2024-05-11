import React from "react";
import HomeNavbar from "./HomeNavbar";
import HomeJumbotron from "./HomeJumbotron";

const HomePage = () => {
  return (
    <React.Fragment>
      <HomeNavbar />
      <HomeJumbotron />
      <div className="h-screen"></div>
      <div id="informasi"></div>
    </React.Fragment>
  );
};

export default HomePage;
