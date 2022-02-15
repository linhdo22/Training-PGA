import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

import { ILoginParams, ILoginValidation } from "../../../models/auth";
import { validateLoginValues, checkValidLoginForm } from "../utils";

interface Props {
  onLogin(values: ILoginParams): void;
  errorMessage: string;
  loading: boolean;
}

export default function LoginComponent(props: Props) {
  const [formValues, setFormValues] = useState<ILoginParams>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formValidations, setFormValidation] = useState<ILoginValidation>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateLoginValues(formValues);
    setFormValidation(validation);
    console.log(validation);
    if (!checkValidLoginForm(validation)) {
      return;
    }
    props.onLogin(formValues);
  };
  return (
    <div className="border border-primary rounded-3 p-3" style={{ width: 400 }}>
      <form onSubmit={handleSubmit} noValidate>
        <p className="fs-3 fw-bold text-center">
          <FormattedMessage id="login" />
        </p>
        <div className="mb-3">
          {/* email  */}
          <label htmlFor="login-email" className="form-label">
            <FormattedMessage id="email" />
          </label>
          <input
            type="email"
            className="form-control"
            id="login-email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          {!!formValidations?.email && (
            <span className="text-danger">
              <FormattedMessage id={formValidations.email} />
            </span>
          )}
        </div>
        {/* password  */}
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            <FormattedMessage id="password" />
          </label>
          <input
            type="password"
            className="form-control"
            id="login-password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
          {!!formValidations?.password && (
            <span className="text-danger">
              <FormattedMessage id={formValidations.password} />
            </span>
          )}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={formValues.rememberMe}
            id="login-remember"
            onChange={(e) =>
              setFormValues({ ...formValues, rememberMe: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="login-remember">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
        <div className="w-100 my-3 ">
          <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
            disabled={props.loading}
          >
            {!!props.loading && (
              <div className="spinner-border spinner-border-sm text-white me-2"></div>
            )}
            <FormattedMessage id="login" />
          </button>
        </div>
        {!!props.errorMessage && (
          <div className="mb-3 bg-danger text-white  p-3 opacity-75">
            {props.errorMessage}
          </div>
        )}
      </form>
      <div>
        <Link to={ROUTES.register}>
          <FormattedMessage id="register" />
        </Link>
      </div>
    </div>
  );
}
