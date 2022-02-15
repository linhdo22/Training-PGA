import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { INTL_LANG } from '../constant'


export interface IntlState {
    locale: string
}

export const setLocale = (locale: string) => {
    localStorage.setItem(INTL_LANG, locale);
    return setLocaleAction(locale)
}

const setLocaleAction = createCustomAction("intl/setLocale", (locale: string) => ({ locale }))

const actions = { setLocale }

type Action = ActionType<typeof actions>

export default function reducer(state: IntlState = { locale: 'vi' }, action: Action) {
    switch (action.type) {
        case getType(setLocaleAction):
            return { ...state, locale: action.locale }
        default:
            return state;
    }
}