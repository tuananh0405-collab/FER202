import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h4 className="d-flex justify-content-center p-3 mb-2 bg-info text-white">
        THE LAB 5 WITH SERVER FAKE
      </h4>
      <h4 className="d-flex justify-content-start pl-2 mb-2 bg-warning text-white">
        <Link to={"/"} className="text-decoration-none text-white bg-primary p-2">
          Home
        </Link>
      </h4>
    </>
  );
};

export default Header;
