import { getType, createCustomAction, ActionType } from "typesafe-actions"

export interface IModifiedInfo {
    id: number,
    title: string,

}

export interface IPhoto {
    almbumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface IPhotoListState {
    list?: IPhoto[]
}

export const setPhotoListAction = createCustomAction('photolist/setPhotoList', (photoList) => ({ photoList }));
export const updatePhotoListAction = createCustomAction('photolist/updatePhotoList', (modifiedList) => ({ modifiedList }));
export const insertPhotoListAction = createCustomAction('photolist/insertPhotoList', (insertedList: IPhoto[]) => ({ insertedList }));


const actions = { setPhotoListAction, updatePhotoListAction, insertPhotoListAction }

type PhotoListActions = ActionType<typeof actions>

export default function reducer(state: IPhotoListState = {}, action: PhotoListActions) {
    switch (action.type) {
        case getType(setPhotoListAction):
            return { ...state, list: action.photoList }
        case getType(updatePhotoListAction):
            return { ...state, list: action.modifiedList }
        case getType(insertPhotoListAction):
            return { ...state, list: action.insertedList }
        default:
            return state;
    }
}

