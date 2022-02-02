import { Action } from "@ngrx/store";
import {
  UserCredentialsModel,
  UserFetch,
  LoginUserDto,
  UserDetailsModel,
  IError,
} from "../../core/models/";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { AnyFn } from "@ngrx/store/src/selector";

export enum UserActionTypes {
  GetUsers = "[Users List] Get users",
  GetUsersSuccess = "[Users List] Get users success",
  GetUser = "[Users] Get user",
  GetUserSuccess = "[Users] Get user success",
}

export class GetUser implements Action {
  public readonly type = UserActionTypes.GetUser;
  constructor(public payload: string) {}
}
export class GetUserSuccess implements Action {
  public readonly type = UserActionTypes.GetUserSuccess;
  constructor(public payload: UserCredentialsModel) {}
}

export class GetUsers implements Action {
  public readonly type = UserActionTypes.GetUsers;
}
export class GetUsersSuccess implements Action {
  public readonly type = UserActionTypes.GetUsersSuccess;
  constructor(public payload: UserCredentialsModel[]) {}
}

export type UserActions = GetUsers | GetUsersSuccess | GetUser | GetUserSuccess;

export const getUser = createAction(
  "GET USER",
  props<{
    id: string;
  }>()
);

export const getUserSuccess = createAction(
  "[Auth] Get Current User Success",
  props<{ payload: any }>()
);
