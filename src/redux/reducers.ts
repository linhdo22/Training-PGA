import { combineReducers, Reducer } from "redux";
import { createBrowserHistory } from 'history'

import IntlReducer, { IntlState } from '../modules/intl/redux/intlReducer'
import AuthReducer, { AuthState } from '../modules/auth/redux/authReducer'
import PhotoListReducer, { PhotoListState } from "../modules/photo-list/redux/photoListReducer";
import { connectRouter } from "connected-react-router";

export interface AppState {
    intl: IntlState
    auth: AuthState
    photoList: PhotoListState
}

const history = createBrowserHistory()

export default combineReducers({
    // router: connectRouter(history),
    intl: IntlReducer,
    auth: AuthReducer,
    photoList: PhotoListReducer
}) as Reducer<AppState>