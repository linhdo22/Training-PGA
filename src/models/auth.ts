export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  repeatPassword: string,
  name: string,
  gender: string,
  region: string,
  state: string
}

export interface IRegisterValidation {
  email: string;
  password: string;
  repeatPassword: string,
  name: string,
  gender: string,
  region: string,
  state: string
}

export interface ILocation {
  id: number,
  pid: number | null,
  name: string,
}
