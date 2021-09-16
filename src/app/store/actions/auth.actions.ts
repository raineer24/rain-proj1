import { Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models/users/user-details.model";
import { UserCredentialsModel } from "../../core/models/users/user-credentials.model";
export enum AuthActionsTypes {
  GetCurrentUser = "[Auth-User] Get Current",
  GetCurrentUserSuccess = "[Auth-User] Get Current Success",
  LoginUser = "[Auth-User] Login",
  LoginUserSuccess = "[Auth-User] Login Success",
}

export class GetCurrentUser implements Action {
  public readonly type = AuthActionsTypes.GetCurrentUser;

  constructor(public payload: boolean) {}
}

export class GetCurrentUserSuccess implements Action {
  public readonly type = AuthActionsTypes.GetCurrentUserSuccess;

  constructor(public payload: UserDetailsModel) {}
}

export class LoginUser implements Action {
  public readonly type = AuthActionsTypes.LoginUser;

  constructor(public payload: any) {}
}

export class LoginUserSuccess implements Action {
  public readonly type = AuthActionsTypes.LoginUserSuccess;

  constructor(public payload: any) {}
}

export type AuthActions =
  | LoginUser
  | GetCurrentUserSuccess
  | GetCurrentUser
  | LoginUserSuccess;
