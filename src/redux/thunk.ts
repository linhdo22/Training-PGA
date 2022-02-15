import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { Action } from "typesafe-actions";

import { AppState } from "./reducers";

export interface CustomThunkDispatch extends ThunkDispatch<AppState, null, Action<string>> { }

export interface CustomThunkAction extends ThunkAction<void, AppState, null, Action<string>> { }