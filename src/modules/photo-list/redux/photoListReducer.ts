import { getType, createCustomAction, ActionType } from "typesafe-actions"

export interface ModifiedInfo {
    id: number,
    title: string,

}

export interface Photo {
    almbumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface PhotoListState {
    list?: Photo[]
}

export const setPhotoListAction = createCustomAction('photolist/setPhotoList', (photoList) => ({ photoList }));

export const updatePhotoListAction = createCustomAction('photolist/updatePhotoList', (modifiedList) => ({ modifiedList }));

const actions = { setPhotoListAction, updatePhotoListAction }

type PhotoListActions = ActionType<typeof actions>

export default function reducer(state: PhotoListState = {}, action: PhotoListActions) {
    switch (action.type) {
        case getType(setPhotoListAction):
            return { ...state, list: action.photoList }
        case getType(updatePhotoListAction):
            return { ...state, list: action.modifiedList }
        default:
            return state;
    }
}

