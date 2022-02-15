import React, { FormEvent, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { API_PATH } from "../../../config/api";
import { ROUTES } from "../../../config/routes";
import {
  ILocation,
  IRegisterParams,
  IRegisterValidation,
} from "../../../models/auth";
import { RESPONSE_STATUS_OK } from "../../../utils/httpResponseCode";
import { CustomFetch } from "../../common/utils";
import { checkValidRegisterForm, validataRegisterValues } from "../utils";

interface Props {
  onRegister(values: IRegisterParams): Promise<boolean>;
  errorMessage: string;
  loading: boolean;
}

const RegisterForm = (props: Props) => {
  const [formValues, setFormValues] = useState<IRegisterParams>({
    email: "",
    password: "",
    repeatPassword: "",
    gender: "",
    name: "",
    region: "",
    state: "",
  });
  const [formValidations, setFormValidations] = useState<IRegisterValidation>();
  const [regions, setRegions] = useState<ILocation[]>([]);
  const [states, setStates] = useState<ILocation[]>([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      const reponse = await CustomFetch(API_PATH.getLocation);
      if (reponse.code !== RESPONSE_STATUS_OK) {
        // handle error
        return;
      }
      setRegions(reponse.data);
    };
    getCountries();
  }, []); // first load form - regsion

  useEffect(() => {
    async function loadStates() {
      if (formValues.region) {
        const reponse = await CustomFetch(
          API_PATH.getLocation + `?pid=${formValues.region}`
        );
        if (reponse.code !== RESPONSE_STATUS_OK) {
          // handle error
          setStates([]);
        }
        return setStates(reponse.data);
      }
    }
    loadStates();
  }, [formValues.region]); // region change - state

  const renderRegions = () => {
    return (
      <div className="mb-3">
        <label className="form-label">
          <FormattedMessage id="region" />
        </label>
        <select
          className="form-select"
          defaultValue={formValues.region}
          onChange={(e) => handleChange(e, "region")}
        >
          <FormattedMessage id="openOptions">
            {(chunk) => <option value="">{chunk}</option>}
          </FormattedMessage>
          {!!regions.length &&
            regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
        </select>
        {renderInvalidField(formValidations?.region)}
      </div>
    );
  };

  const renderStates = () => {
    if (!formValues.region) {
      return null;
    }
    return (
      <div className="mb-3">
        <label className="form-label">
          <FormattedMessage id="state" />
        </label>
        <select
          className="form-select"
          defaultValue={formValues.state}
          onChange={(e) => handleChange(e, "state")}
        >
          <FormattedMessage id="openOptions">
            {(chunk) => <option value="">{chunk}</option>}
          </FormattedMessage>
          {!!states.length &&
            states.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
        </select>
        {renderInvalidField(formValidations?.state)}
      </div>
    );
  };

  const renderInvalidField = (field: string | undefined) => {
    return (
      !!field && (
        <span className="text-danger small">
          <FormattedMessage id={field} />
        </span>
      )
    );
  };
  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>,
    type: string
  ) => {
    setFormValues({ ...formValues, [type]: e.currentTarget.value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validations = validataRegisterValues(formValues);
    setFormValidations(validations);
    if (!checkValidRegisterForm(validations)) {
      return;
    }
    props.onRegister(formValues).then((isSuccess) => {
      if (isSuccess) {
        setRegisterSuccess(true);
      }
    });
  };
  return (
    <div
      className="containter p-3 rounded border border-primary shadow"
      style={{ width: 400 }}
    >
      <div className="row">
        <div className="col">
          <form noValidate onSubmit={onSubmit}>
            <p className="fs-3 fw-bold text-center">
              <FormattedMessage id="register" />
            </p>
            {/* email  */}
            <div className="mb-3">
              <label htmlFor="register-email" className="form-label">
                <FormattedMessage id="email" />
              </label>
              <input
                type="email"
                className="form-control"
                id="register-email"
                onChange={(e) => handleChange(e, "email")}
              />
              {renderInvalidField(formValidations?.email)}
            </div>
            {/* password  */}
            <div className="mb-3">
              <label htmlFor="register-password" className="form-label">
                <FormattedMessage id="password" />
              </label>
              <input
                type="password"
                className="form-control"
                id="register-password"
                onChange={(e) => handleChange(e, "password")}
              />
              {renderInvalidField(formValidations?.password)}
            </div>
            {/* repeart password  */}
            <div className="mb-3">
              <label htmlFor="register-repeat-password" className="form-label">
                <FormattedMessage id="repeatPassword" />
              </label>
              <input
                type="password"
                className="form-control"
                id="register-repeat-password"
                onChange={(e) => handleChange(e, "repeatPassword")}
              />
              {renderInvalidField(formValidations?.repeatPassword)}
            </div>
            {/* name  */}
            <div className="mb-3">
              <label htmlFor="register-name" className="form-label">
                <FormattedMessage id="name" />
              </label>
              <input
                type="text"
                className="form-control"
                id="register-name"
                onChange={(e) => handleChange(e, "name")}
              />
              {renderInvalidField(formValidations?.name)}
            </div>
            {/* gender  */}
            <div className="mb-3">
              <label className="form-label">
                <FormattedMessage id="gender" />
              </label>
              <select
                className="form-select"
                defaultValue={formValues.gender}
                onChange={(e) => handleChange(e, "gender")}
              >
                <FormattedMessage id="openOptions">
                  {(chunk) => <option value="">{chunk}</option>}
                </FormattedMessage>
                <FormattedMessage id="male">
                  {(chunk) => <option value="male">{chunk}</option>}
                </FormattedMessage>
                <FormattedMessage id="female">
                  {(chunk) => <option value="female">{chunk}</option>}
                </FormattedMessage>
              </select>
              {renderInvalidField(formValidations?.gender)}
            </div>
            {renderRegions()}
            {renderStates()}
            {/* register btn  */}
            <div className="mb-3">
              <button type="submit" className="btn btn-primary d-block mx-auto">
                {!!props.loading && (
                  <div className="spinner-border spinner-border-sm text-white me-2"></div>
                )}
                <FormattedMessage id="register" />
              </button>
            </div>
            {!!props.errorMessage && (
              <div className="mb-3 bg-danger text-white  p-3 opacity-75">
                {props.errorMessage}
              </div>
            )}
            {registerSuccess && (
              <div className="mb-3 bg-danger text-white  p-3 opacity-75">
                <FormattedMessage id="registerSuccess" />.
              </div>
            )}
            <Link to={ROUTES.login} className="ms-2">
              <FormattedMessage id="login" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
