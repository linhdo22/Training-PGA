import { ActionType, createCustomAction, getType } from 'typesafe-actions'

import { IUser } from '../../../models/user'

export interface IAuthState {
    user?: IUser,
}

export const setUserAction = createCustomAction("auth/setUser", (user: IUser) => ({ user }))
export const logOutAction = createCustomAction("auth/logOut");


const actions = { setUserAction, logOutAction }


type AuthAction = ActionType<typeof actions>


export default function reducer(state: IAuthState = {}, action: AuthAction) {
    switch (action.type) {
        case getType(setUserAction):
            return { ...state, user: action.user }
        case getType(logOutAction):
            return {}
        default:
            return state
    }
}