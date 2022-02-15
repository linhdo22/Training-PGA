import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { AppState } from "../../../redux/reducers";

function Header() {
  const user = useSelector((state: AppState) => state.auth.user);

  if (!user) {
    return null;
  }
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="navbar navbar-expand-lg navbar-dark bg-primay">
          <Link to={ROUTES.home} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav me-auto">
            <Link to={ROUTES.photoList} className="nav-link">
              Photo List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
