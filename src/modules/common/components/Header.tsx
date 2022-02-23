import React from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { ROUTES } from "../../../config/routes";
import { AppState } from "../../../redux/reducers";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { logOutAction } from "../../auth/redux/authReducer";

function Header() {
  const user = useSelector((state: AppState) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOutAction());
    Cookies.remove(ACCESS_TOKEN);
    history.push(ROUTES.login);
  };

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
            <Link to={ROUTES.profile} className="nav-link">
              Profile
            </Link>
            <Link to={ROUTES.products} className="nav-link">
              Products
            </Link>
          </div>
          <div className="ms-auto ">
            <div className="btn btn-warning text-white" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
