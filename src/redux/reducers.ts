import { combineReducers, Reducer } from "redux";
// import { createBrowserHistory } from 'history'
// import { connectRouter } from "connected-react-router";

import IntlReducer, { IIntlState } from '../modules/intl/redux/intlReducer'
import AuthReducer, { IAuthState } from '../modules/auth/redux/authReducer'
import PhotoListReducer, { IPhotoListState } from "../modules/photo-list/redux/photoListReducer";
import ProductReducer, { IProductState } from "../modules/products/redux/productReducer";

export interface AppState {
    intl: IIntlState
    auth: IAuthState
    photoList: IPhotoListState
    products: IProductState
}

// const history = createBrowserHistory()

export default combineReducers({
    // router: connectRouter(history),
    intl: IntlReducer,
    auth: AuthReducer,
    photoList: PhotoListReducer,
    products: ProductReducer,
}) as Reducer<AppState>