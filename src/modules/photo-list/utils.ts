
import { API_PATH } from "../../config/api"
import { IPhoto } from "../../models/photo"
import { CustomThunkAction } from "../../redux/thunk"
import { CustomFetch } from "../common/utils"
import { insertPhotoListAction } from "./redux/photoListReducer"

export const loadMorePhotos = (start: number, amount: number = 10): CustomThunkAction => async (dispatch, getState) => {
    const photoList = getState().photoList.list?.slice() || []
    const response: IPhoto[] = await CustomFetch(API_PATH.getPhotos + `?_start=${start}&_end=${start + amount}`)
    response.forEach((photo) => {
        const lastPhotoId = photoList[photoList.length - 1]?.id || -1
        if (photo.id > lastPhotoId) {
            photoList.push(photo)
        }
    })
    dispatch(insertPhotoListAction(photoList))
}