import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import LoginComponent from "../components/LoginForm";
import { ILoginParams } from "../../../models/auth";
import { CustomThunkDispatch } from "../../../redux/thunk";
import { CustomFetch } from "../../common/utils";
import { API_PATH } from "../../../config/api";
import { setUserAction } from "../redux/authReducer";
import { RESPONSE_STATUS_OK } from "../../../utils/httpResponseCode";
import { getErrorMessageResponse } from "../../../utils";
import { ACCESS_TOKEN } from "../../../utils/constant";

export default function LoginPage() {
  const dispatch = useDispatch<CustomThunkDispatch>();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onLogin = async (values: ILoginParams) => {
    setLoading(true);
    setErrorMessage("");
    const response = await CustomFetch(API_PATH.signIn, "post", {
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (response?.code !== RESPONSE_STATUS_OK) {
      setErrorMessage(getErrorMessageResponse(response));
      return;
    }
    dispatch(setUserAction(response.data));
    Cookies.set(ACCESS_TOKEN, response.data.token, {
      expires: values.rememberMe ? 7 : undefined,
    });
    history.push("/");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <LoginComponent
        errorMessage={errorMessage}
        onLogin={onLogin}
        loading={loading}
      />
    </div>
  );
}
