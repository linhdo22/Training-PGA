import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import { ACCESS_TOKEN } from "./utils/constant";
import { ROUTES } from "./config/routes";
import ProtectedRoute from "./modules/common/components/ProtectedRoute";
import Header from "./modules/common/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RESPONSE_STATUS_OK } from "./utils/httpResponseCode";
import { CustomFetch } from "./modules/common/utils";
import { AppState } from "./redux/reducers";
import { API_PATH } from "./config/api";
import { setUserAction } from "./modules/auth/redux/authReducer";

// import ProfilePage from "./modules/profile/pages/ProfilePage";
const HomePage = lazy(() => import("./modules/home/pages/HomePage"));
const LoginPage = lazy(() => import("./modules/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./modules/auth/pages/RegisterPage"));
const ProfilePage = lazy(() => import("./modules/profile/pages/ProfilePage"));

const PhotoListPage = lazy(
  () => import("./modules/photo-list/pages/PhotoListPage")
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector<AppState>((state) => state.auth.user);

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    if (accessToken && !user) {
      const reponse = await CustomFetch(API_PATH.getProfile);
      if (reponse?.code === RESPONSE_STATUS_OK) {
        dispatch(setUserAction({ ...reponse.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedRoute exact path={ROUTES.home} component={HomePage} />
          <ProtectedRoute path={ROUTES.photoList} component={PhotoListPage} />
          <ProtectedRoute path={ROUTES.profile} component={ProfilePage} />
          <Route path={ROUTES.login} component={LoginPage} />
          <Route path={ROUTES.register} component={RegisterPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
