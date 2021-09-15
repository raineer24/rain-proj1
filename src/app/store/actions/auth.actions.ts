import { Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models/users/user-details.model";

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

export type AuthActions = GetCurrentUserSuccess | GetCurrentUser;
