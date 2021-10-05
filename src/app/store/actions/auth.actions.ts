import { Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models/users/user-details.model";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
import { Update } from "@ngrx/entity";
export enum AuthActionsTypes {
  LoginUser = "[Auth-User] Login",
  LoginUserSuccess = "[Auth-User] Login Success",
  LogoutUser = "[Auth-User] Logout",
  GET_USER = "[User] GET_USER",
  GET_USER_SUCCESS = "[User] GET_USER_SUCCESS",
  UPDATE_PROFILE = "[User] Update Profile",
  UPDATE_PROFILE_SUCCESS = "[User] Update Success",
  GET_USER_FAIL = "[User] GET_USER_FAIL",
  RegisterUser = "[Auth-User] Register User",
  RegisterUserSuccess = "[Auth-User] Register User Success",
}

export class UpdateProfile implements Action {
  readonly type = AuthActionsTypes.UPDATE_PROFILE;
  constructor(public payload: UserFetch) {}
}

export class UpdateProfileSucess implements Action {
  readonly type = AuthActionsTypes.UPDATE_PROFILE_SUCCESS;
  constructor(
    public payload: {
      id: number;
      payload: UserFetch;
    }
  ) {}
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
  | RegisterUserSuccess
  | UpdateProfile
  | UpdateProfileSucess;
