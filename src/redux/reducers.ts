import { combineReducers } from "redux";

import IntlReducer, { IntlState } from '../modules/intl/redux/intlReducer'
import AuthReducer, { AuthState } from '../modules/auth/redux/authReducer'
import PhotoListReducer, { PhotoListState } from "../modules/photo-list/redux/photoListReducer";

export interface AppState {
    intl: IntlState
    auth: AuthState
    photoList: PhotoListState
}

export default combineReducers({
    intl: IntlReducer,
    auth: AuthReducer,
    photoList: PhotoListReducer
})