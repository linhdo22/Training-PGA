import React from "react";
import { useSelector } from "react-redux";

import { IUser } from "../../../models/user";
import { AppState } from "../../../redux/reducers";
import UserDetail from "../components/UserDetailComponent";

export default function ProfilePage() {
  const user = useSelector<AppState>((state) => state.auth.user) as IUser;
  return (
    <div>
      <UserDetail user={user} />
    </div>
  );
}
