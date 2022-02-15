import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";

import { ROUTES } from "../../../config/routes";
import { ACCESS_TOKEN } from "../../../utils/constant";

export default function ProtectedRoute(props: RouteProps) {
  const authToken = Cookies.get(ACCESS_TOKEN);
  if (!authToken) {
    return <Redirect to={ROUTES.login} />;
  }
  return <Route {...props}></Route>;
}
