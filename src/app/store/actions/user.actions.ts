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
  LOAD_USERS = "[User] Load Users",
  SUCCESS_INIT_USERS = "[userList] Success Init User",
}
export class SuccessInitUsers implements Action {
  readonly type = UserActionTypes.SUCCESS_INIT_USERS;
  constructor(public payload: any) {}
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_USERS;
  //constructor(public payload: any) {}
}

export type UserActions = LoadUsers | SuccessInitUsers;

// export const loadUsers = createAction("[Users Management] Load Users", () => ({
//   showLoader: true,
// }));

// export const loadUsersSuccess = createAction(
//   "[Users Management] Load Users Success",
//   (users: UserCredentialsModel[]) => ({
//     users,
//     triggerAction: loadUsers.type,
//   })
// );

// export const loadUsersFail = createAction(
//   "[Users Management] Load Users Fail",
//   (error: any) => ({
//     error,
//     triggerAction: loadUsers.type,
//   })
// );

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

export const loadUsers = createAction(
  "[Users Management] Load Users",
  props<{
    payload: any;
  }>()
);

export const loadUsersSuccess = createAction(
  "[Users] load Users Success",
  props<{ payload: any }>()
);
