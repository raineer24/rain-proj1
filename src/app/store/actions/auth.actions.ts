import { Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models/users/user-details.model";
import { UserCredentialsModel } from "../../core/models/users/user-credentials.model";
export enum AuthActionsTypes {
  LoginUser = "[Auth-User] Login",
  LoginUserSuccess = "[Auth-User] Login Success",
  LogoutUser = "[Auth-User] Logout",
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

export type AuthActions = LoginUser | LoginUserSuccess | LogoutUser;
