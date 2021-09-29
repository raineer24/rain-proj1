import { Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models/users/user-details.model";
import { UserCredentialsModel } from "../../core/models/users/user-credentials.model";
export enum AuthActionsTypes {
  LoginUser = "[Auth-User] Login",
  LoginUserSuccess = "[Auth-User] Login Success",
  LogoutUser = "[Auth-User] Logout",
  GET_USER = "[User] GET_USER",
  GET_USER_SUCCESS = "[User] GET_USER_SUCCESS",
  GET_USER_FAIL = "[User] GET_USER_FAIL",
  RegisterUser = "[Auth-User] Register User",
  RegisterUserSuccess = "[Auth-User] Register User Success",
}

export class RegisterUser implements Action {
  public readonly type = AuthActionsTypes.RegisterUser;

  constructor(public payload: UserDetailsModel | FormData) {}
}

export class RegisterUserSuccess implements Action {
  public readonly type = AuthActionsTypes.RegisterUserSuccess;

  constructor(public payload: any) {}
}

export class GetUserAction implements Action {
  readonly type = AuthActionsTypes.GET_USER;

  constructor(public payload: { id: string }) {}
}

export class GetUserSuccessAction implements Action {
  readonly type = AuthActionsTypes.GET_USER_SUCCESS;

  constructor(public payload: any) {}
}
export class GetUserFailAction implements Action {
  readonly type = AuthActionsTypes.GET_USER_FAIL;
  constructor(public payload: any) {}
}

export class LoginUser implements Action {
  public readonly type = AuthActionsTypes.LoginUser;

  constructor(public payload: any) {}
}

export class LoginUserSuccess implements Action {
  public readonly type = AuthActionsTypes.LoginUserSuccess;

  constructor(public payload: any) {}
}

export class LogoutUser implements Action {
  public readonly type = AuthActionsTypes.LogoutUser;
}

export type AuthActions =
  | LoginUser
  | LoginUserSuccess
  | LogoutUser
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailAction
  | RegisterUserSuccess;
