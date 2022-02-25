import { API_PATH } from "../../../config/api";
import { CustomThunkAction } from "../../../redux/thunk";
import { RESPONSE_STATUS_OK } from "../../../utils/httpResponseCode";
import { setUserAction } from "../../auth/redux/authReducer";
import { CustomFetch } from "../utils";


export const getProfileThunk = (): CustomThunkAction => async (dispatch, getState) => {
    const reponse = await CustomFetch(API_PATH.getProfile);
    if (reponse?.code === RESPONSE_STATUS_OK) {
        dispatch(setUserAction({ ...reponse.data }));
    }
}