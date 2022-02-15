import React, { useCallback, useState } from "react";
import { API_PATH } from "../../../config/api";

import { IRegisterParams } from "../../../models/auth";
import { getErrorMessageResponse } from "../../../utils";
import { RESPONSE_STATUS_OK } from "../../../utils/httpResponseCode";
import { CustomFetch } from "../../common/utils";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onRegister = useCallback(async (values: IRegisterParams) => {
    setLoading(true);
    setErrorMessage("");
    const response = await CustomFetch(API_PATH.register, "post", values);
    setLoading(false);
    if (response.code != RESPONSE_STATUS_OK) {
      setErrorMessage(getErrorMessageResponse(response));
      return false;
    }
    return true;
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 py-5">
        <RegisterForm
          onRegister={onRegister}
          errorMessage={errorMessage}
          loading={loading}
        />
      </div>
    </>
  );
};
export default RegisterPage;
