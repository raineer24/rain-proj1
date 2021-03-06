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

//export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

// export const loadUsers = createAction("[Users Management] Load Users", () => ({
//   showLoader: true,
// }));

export const upsertProfile = createAction(
  "[Profile] Upsert profile ",
  props<{ profileId: string; u_profile: UserFetch }>()
);
export const upsertProfileSuccess = createAction(
  "[Profile] Upsert profile  success",
  props<{ profileId: string; u_profile: UserFetch[] }>()
);

export const loginFailure = createAction(
  "[Auth/API] Login Failure", //
  props<{ error: IError }>()
);

export const register = createAction(
  "[Auth] Pango Register",
  props<{
    payload: FormData;
  }>()
);

export const getUser = createAction(
  "GET USER",
  props<{
    id: string;
  }>()
);

export const createExpProfile = createAction(
  "[User] Create Experience Profile ",
  props<{
    payload: any;
  }>()
);

export const createExpProfileSuccess = createAction(
  "[User] Create Experience Profile Success",
  props<{ payload: any }>()
);

export const createEduProfile = createAction(
  "[User] Create Education Profile ",
  props<{
    payload: any;
  }>()
);

export const createEduProfileSuccess = createAction(
  "[User] Create Education Profile Success",
  props<{ payload: any }>()
);

export const deleteExpProfile = createAction(
  "[User] Delete Experience Profile ",
  props<{ id: number }>()
);

export const deleteEduProfile = createAction(
  "[User] Delete Education Profile ",
  props<{ id: number }>()
);

export const deleteExpProfileSuccess = createAction(
  "[User] Delete Experience Profile Success",
  props<{ payload: any }>()
);

export const deleteEduProfileSuccess = createAction(
  "[User] Delete Education Profile Success",
  props<{ payload: any }>()
);

export const createProfile = createAction(
  "[User] Create Profile ",
  props<{ payload: any }>()
);

export const createProfileSuccess = createAction(
  "[User] Create Profile Success",
  props<{ payload: any }>()
);

export const getUserSuccess = createAction(
  "[Auth] Get Current User Success",
  props<{ payload: any }>()
);
export const registerFailure = createAction("[Auth] Register Pango Failure");
export const registerSuccess = createAction(
  "[Auth] Register Pango Success",
  props<{ user: any }>()
);

//export const signupSuccess = createAction(SIGNUP_SUCCESS);

export const login = createAction(
  "[Auth] Pango Login",
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Pango Success",
  props<{ user: any }>()
);

export const logout = createAction("[Auth] Logout");
export const loggedOut = createAction("[Auth] Logged out");
