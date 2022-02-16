import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { API_PATH } from "../../../config/api";
import { ILocation } from "../../../models/auth";
import { IUser } from "../../../models/user";
import { RESPONSE_STATUS_OK } from "../../../utils/httpResponseCode";
import { CustomFetch } from "../../common/utils";

interface Props {
  user: IUser;
}

function UserDetail(props: Props) {
  const { user } = props;
  const [corespondingRegion, setCorespondingRegion] = useState("");
  const [corespondingState, setCorespondingState] = useState("");

  useEffect(() => {
    async function getState() {
      const reponse = await CustomFetch(
        API_PATH.getLocation + `?pid=${user.region}`
      );
      if (reponse.code !== RESPONSE_STATUS_OK) {
        setCorespondingState("Can't load state");
        return;
      }
      reponse.data.forEach((state: ILocation) => {
        if (state.id == user.state) {
          setCorespondingState(state.name);
        }
      });
    }
    getState();
  }, [user.region, user.state]); // get state name

  useEffect(() => {
    async function getRegion() {
      const reponse = await CustomFetch(API_PATH.getLocation);
      if (reponse.code !== RESPONSE_STATUS_OK) {
        setCorespondingRegion("Can't load region");
        return;
      }
      reponse.data.forEach((region: ILocation) => {
        if (region.id == user.region) {
          setCorespondingRegion(region.name);
        }
      });
    }
    getRegion();
  }, [user.region]); // get region name

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col-8 offset-2 border border-primary p-3 d-flex">
          <div className="flex-grow-1 bg-warining">
            {/* name  */}
            <div className="my-1 d-flex">
              <div className="fw-bold w-50">
                <FormattedMessage id="name" />:
              </div>
              <div className="w-50">{user.name}</div>
            </div>
            {/* email  */}
            <div className="my-1 d-flex">
              <div className="fw-bold w-50">
                <FormattedMessage id="email" />:
              </div>
              <div className="w-50">{user.email}</div>
            </div>
            {/* gender  */}
            <div className="my-1 d-flex">
              <div className="fw-bold w-50">
                <FormattedMessage id="gender" />:
              </div>
              <div className="w-50">
                <FormattedMessage id={user.gender} />
              </div>
            </div>
            {/* region  */}
            <div className="my-1 d-flex">
              <div className="fw-bold w-50">
                <FormattedMessage id="region" />:
              </div>
              <div className="w-50">{corespondingRegion || "loading..."}</div>
            </div>
            {/* state  */}
            <div className="my-1 d-flex">
              <div className="fw-bold w-50">
                <FormattedMessage id="state" />:
              </div>
              <div className="w-50">{corespondingState || "loading..."}</div>
            </div>
          </div>
          {/* <div className="border border-danger">avatar</div> */}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
