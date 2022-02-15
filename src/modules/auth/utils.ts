
import { ILoginParams, ILoginValidation, IRegisterParams, IRegisterValidation } from '../../models/auth'
import { validEmailRegex } from '../../utils/index'

function validateEmail(email: string) {
    if (!email) {
        return 'emailRequire'
    }
    if (!validEmailRegex.test(email)) {
        return 'emailInvalid'
    }
    return ''
}

function validatePassword(password: string) {
    if (!password) {
        return 'passwordRequire'
    }
    if (password.length < 6) {
        return 'minPasswordInvalid'
    }
    return ''
}

function validateRepeartPassword(password: string, repeatPassword: string) {
    if (!password) {
        return 'passwordRequire'
    }
    if (password.length < 6) {
        return 'minPasswordInvalid'
    }
    if (password !== repeatPassword) {
        return 'repeatPasswordNotMatch'
    }
    return ''
}

function validateName(name: string) {
    if (!name) {
        return "nameRequire"
    }
    if (name.length < 6) {
        return 'minNameInvalid'
    }
    return ''
}

function validateGender(gender: string) {
    if (!gender) {
        return "genderRequire"
    }
    return ''
}
function validateRegion(region: string) {
    if (!region) {
        return "regionRequire"
    }
    return ''
}
function validateState(state: string) {
    if (!state) {
        return "stateRequire"
    }
    return ''
}




export function validateLoginValues(values: ILoginParams): ILoginValidation {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
    }
}

export function checkValidLoginForm(values: ILoginValidation): boolean {
    return !values.email && !values.password
}

export function validataRegisterValues(values: IRegisterParams): IRegisterValidation {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRepeartPassword(values.password, values.repeatPassword),
        name: validateName(values.name),
        gender: validateGender(values.gender),
        region: validateRegion(values.region),
        state: validateState(values.state)
    }
}

export function checkValidRegisterForm(values: IRegisterValidation) {
    return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender && !values.region && !values.state
}