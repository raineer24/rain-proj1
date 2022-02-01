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
}

export class GetUsers implements Action {
  public readonly type = UserActionTypes.GetUsers;
}
export class GetUsersSuccess implements Action {
  public readonly type = UserActionTypes.GetUsersSuccess;
  constructor(public payload: UserCredentialsModel[]) {}
}

export type UserActions = GetUsers | GetUsersSuccess;
