import { ActionType, createCustomAction, getType } from 'typesafe-actions'

import { IUser } from '../../../models/user'

export interface AuthState {
    user?: IUser,
}

export const setUserAction = createCustomAction("auth/setUser", (user: IUser) => ({ user }))


const actions = { setUserAction }


type AuthAction = ActionType<typeof actions>


export default function reducer(state: AuthState = {}, action: AuthAction) {
    switch (action.type) {
        case getType(setUserAction):
            return { ...state, user: action.user }
        default:
            return state
    }
}